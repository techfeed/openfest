var app = require(__dirname + '/../server');
var async = require('async');

var ds = app.dataSources.db;

// create all models
async.waterfall([
  createUsers, createRole, createEvents, createTickets, close
], function(err) {
  if (err) throw err;
  console.log('> models created sucessfully');
});


var accounts = [{
  username: 'admin',
  email: 'admin@openfest.org',
  displayName: 'Admin',
  password: 'admin.pass',
  profile: '管理者です',
  created: new Date(),
  modified: new Date()
}, {
  username: 'test1',
  email: 'test1@example.com',
  displayName: 'TestUser-1',
  profile: 'こんにちわ。はじめまして！テスト１です。',
  password: 'password1',
  created: new Date(),
  modified: new Date()
}, {
  username: 'test2',
  email: 'test2@example.com',
  displayName: 'TestUser-1',
  profile: 'こんにちわ。はじめまして！テスト２です。',
  password: 'password2',
  created: new Date(),
  modified: new Date()
}];

// create reviewers
function createUsers(cb) {

  ds.automigrate('FestUser', function(err) {
    if (err) return cb(err);

    app.models.FestUser.create(accounts, function(err, obj) {
      console.log('> user created.', obj);
      cb(err, obj);
    });
  });
}

function createRole(users, cb) {
  app.models.Role.create({
    name: 'admin'
  }, function(err, role) {
    if (err) return cb(err);

    // Make Bob an admin
    role.principals.create({
      principalType: 'FestUser',
      principalId: users[0].id
    }, function(err, principal) {
      if (err) return cb(err);
      cb(err, users);
    });
  });
}

// create coffee shops
function createEvents(users, cb) {

  var events = [{
    title: 'テストイベント1',
    subtitle: 'テストサブタイトル1',
    amountOfTicket: 100,
    startAt: new Date(2014, 6, 17, 19, 0, 0),
    endAt: new Date(2014, 7, 17, 21, 0, 0),
    published: true,
    publishedAt: new Date(2014, 4, 17, 21, 0, 0),
    ownerId: users[1].id
  }, {
    title: 'テストイベント2',
    subtitle: 'テストサブタイトル2',
    amountOfTicket: 100,
    startAt: new Date(2016, 2, 17, 19, 0, 0),
    endAt: new Date(2016, 4, 17, 21, 0, 0),
    published: true,
    publishedAt: new Date(2016, 5, 17, 21, 0, 0),
    ownerId: users[1].id
  }, {
    title: 'テストイベント3',
    subtitle: 'テストサブタイトル3',
    amountOfTicket: 100,
    startAt: new Date(2016, 2, 17, 19, 0, 0),
    endAt: new Date(2016, 4, 17, 21, 0, 0),
    published: false,
    publishedAt: new Date(2016, 5, 17, 21, 0, 0),
    ownerId: users[1].id
  }];

  ds.automigrate('Event', function(err) {
    if (err) return cb(err);

    app.models.Event.create(events, function(err, obj) {
      console.log('> event created.', obj);
      cb(err, {users: users, events: obj});
    });
  });
}

function createTickets(opt, cb) {

  var event = opt.events[0];
  var tickets = [{
    ticketNo: '1234ABCD',
    issuedAt: new Date(2015, 3, 18, 19, 0, 0),
    eventId: event.id,
    purchaserId: opt.users[1].id
  }, {
    ticketNo: '1234ABCE',
    issuedAt: new Date(2015, 4, 23, 19, 0, 0),
    eventId: event.id,
    purchaserId: opt.users[2].id
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
