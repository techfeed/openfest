var async = require('async');

module.exports = function(app) {
  // data sources
  var ds = app.dataSources.db;

  // create all models
  async.waterfall([
    createUsers, createEvents, createTickets
  ], function(err) {
    if (err) throw err;
    console.log('> models created sucessfully');
  });

  // create reviewers
  function createUsers(cb) {
    ds.automigrate('User', function(err) {
      if (err) return cb(err);

      app.models.User.create([
        {email: 'example@example.com', password: 'password'}
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
          amountOfTicket: 100,
          startAt: new Date(2015,6,17,19,0,0),
          endAt: new Date(2015,7,17,21,0,0),
          published: true,
          publishedAt: new Date(2015,4,17,21,0,0),
          ownerId: users[0].id
        }
      ], cb);
    });
  }

  function createTickets(events, cb) {
    ds.automigrate('Ticket', function(err) {
      var event = events[0];
      app.models.Ticket.create([{
        ticketNo: '1234ABCD',
        issuedAt: new Date(2015,6,18,19,0,0),
        eventId: event.id,
        purchaserId: event.ownerId
      }], cb);
    });
  }
};
