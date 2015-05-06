var app = require('./server');
var async = require('async');

var ds = app.dataSources.db;

// create all models
async.waterfall([
  createUsers, createEvents, createTickets, close
], function(err) {
  if (err) throw err;
  console.log('> models created sucessfully');
});

// create reviewers
function createUsers(cb) {

  var accounts = [{
    username: 'TestUser-1',
    email: 'test1@example.com',
    password: 'password1',
    created: new Date(),
    modified: new Date()
  }, {
    username: 'TestUser-2',
    email: 'test2@example.com',
    password: 'password2',
    created: new Date(),
    modified: new Date()
  }];

  ds.automigrate('FestUser', function(err) {
    if (err) return cb(err);

    app.models.FestUser.create(accounts, function(err, obj) {
      console.log('> user created.', obj);
      cb(err, obj);
    });
  });
}

// create coffee shops
function createEvents(users, cb) {

  var events = [{
    title: 'テストイベント1',
    subtitle: 'テストサブタイトル1',
    amountOfTicket: 100,
    startAt: new Date(2015,6,17,19,0,0),
    endAt: new Date(2015,7,17,21,0,0),
    published: true,
    publishedAt: new Date(2015,4,17,21,0,0),
    ownerId: users[0].id
  }];

  ds.automigrate('Event', function(err) {
    if (err) return cb(err);

    app.models.Event.create(events, function(err, obj) {
      console.log('> event created.', obj);
      cb(err, obj);
    });
  });
}

function createTickets(events, cb) {

  var event = events[0];
  var tickets = [{
    ticketNo: '1234ABCD',
    issuedAt: new Date(2015, 6, 18, 19, 0, 0),
    eventId: event.id,
    purchaserId: event.ownerId
  }];

  ds.automigrate('Ticket', function(err) {
    app.models.Ticket.create(tickets, function(err, obj) {
      console.log('> ticket created.', obj);
      cb(err, obj);
    });
  });
}

function close() {
  ds.disconnect();
}
