var async = require('async');

module.exports = function(Ticket) {
  Ticket.purchase = function(eventId, userId, cb) {
    Event = Ticket.app.models.Event;

    async.parallel({
      event: function(callback) {
        Event.findById(eventId, callback);
      },
      countOfTicket: function(callback) {
        // Not cancelled
        Ticket.count({where: {exists: {cancelledAt: false}}}, callback);
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
      if (results.event.amountOfTicket > results.countOfTicket) {
        ticket.issuedAt = now;
      }
      Ticket.create(ticket, cb);
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
};
