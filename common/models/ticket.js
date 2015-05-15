var async = require('async');

module.exports = function(Ticket) {
  Ticket.purchase = function(eventId, userId, cb) {
    var Event = Ticket.app.models.Event;

    async.parallel({
      event: function(callback) {
        Event.findById(eventId, callback);
      },
      validTickets: function(callback) {
        // Not cancelled
        Ticket.find({
          eventId: eventId
        }, function(err, tickets) {
          if (err) {
            callback(err);
            return;
          }
          var validTickets = tickets.filter(function(ticket) {
            return !ticket.cancelledAt;
          });
          callback(null, validTickets);
        });
      }
    }, function(err, results) {
      if (err) {
        return cb(err);
      }
      var now = new Date();
      var ticketNo = Math.floor(Math.random() * 100000);
      var ticket = {
        eventId: eventId,
        purchaserId: userId,
        ticketNo: ticketNo,
        createdAt: now
      };
      // Ticket remains
      if (results.event.amountOfTicket > results.validTickets.length) {
        ticket.issuedAt = now;
      }
      Ticket.create(ticket, cb);
    });
  };

  Ticket.cancel = function(ticketId, userId, cb) {
    var ret = null;
    async.waterfall([
      function(callback) {
        Ticket.findById(ticketId, callback);
      },
      function(ticket, callback) {
        if (ticket.purchaserId.toString() !== userId &&
          ticket.eventId.toString() !== userId) {
          callback('Only ticket owner or event owner can cancel a ticket.');
          return;
        }
        ticket.cancelledAt = new Date();
        ticket.cancelledUserId = userId;
        ticket.save(callback);
      },
      function(ticket, callback) {
        ret = ticket;
        // Search waiting ticket and update
        Ticket.find({
          where: {
            eventId: ticket.eventId
          },
          order: 'createdAt'
        }, function(err, tickets) {
          if (err) {
            callback(err);
            return;
          }
          for (var i = 0, n = tickets.length; i < n; i++) {
            var t = tickets[i];
            // Waiting for cancel
            if (!t.issuedAt && !t.cancelledAt) {
              callback(null, t);
              return;
            }
          }
          callback(null, null);
        });
      },
      function(waiting, callback) {
        if (!waiting) {
          callback();
          return;
        }
        waiting.issuedAt = new Date();
        Ticket.
        waiting.save(callback);
      }
    ], function(err) {
      cb(err, ret);
    });
  };
  Ticket.remoteMethod(
    'purchase',
    {
      accepts: [
        { arg: 'eventId', type: 'string', required: true },
        { arg: 'userId', type: 'string', required: true }
      ],
      http: { path: '/purchase', verb: 'post' },
      returns: { arg: 'ticket', type: 'object' }
    }
  );
  Ticket.remoteMethod(
    'cancel',
    {
      accepts: [
        { arg: 'ticketId', type: 'string', required: true },
        { arg: 'userId', type: 'string', required: true }
      ],
      http: { path: '/cancel', verb: 'post' },
      returns: { arg: 'ticket', type: 'object' }
    }
  );
};
