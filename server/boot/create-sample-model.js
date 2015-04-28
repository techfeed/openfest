var async = require('async');

module.exports = function(app) {
  // data sources
  var ds = app.dataSources.db;

  // create all models
  async.waterfall([
    createUsers, createEvents, createTickets, createOrders
  ], function(err) {
    if (err) throw err;
    console.log('> models created sucessfully');
  });

  // create reviewers
  function createUsers(cb) {
    ds.automigrate('User', function(err) {
      if (err) return cb(err);

      app.models.User.create([
        {email: 'shumpei.shiraishi@gmail.com', password: 'password'}
      ], cb);
    });
  }

  // create coffee shops
  function createEvents(users, cb) {
    ds.automigrate('Event', function(err) {
      if (err) return cb(err);

      app.models.Event.create([
        {
          title: 'テストイベント1',
          subtitle: 'テストサブタイトル1',
          startAt: new Date(2015,6,17,19,0,0),
          endAt: new Date(2015,6,17,21,0,0),
          published: true,
          ownerId: users[0].id
        }
      ], cb);
    });
  }

  function createTickets(events, cb) {
    ds.automigrate('Ticket', function(err) {
      app.models.Ticket.create([{
        amount: 100,
        eventId: events[0].id
      }], cb);
    });
  }
  // create reviews
  function createOrders(tickets, cb) {
    console.log(tickets);
    ds.automigrate('TicketOrder', function(err) {
      if (err) return cb(err);

      var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

      app.models.TicketOrder.create([
        {
          timestamp: new Date(),
          cancelled: false,
          ticketId: tickets[0].id,
          userId: 1
        }
      ], cb);
    });
  }
};
