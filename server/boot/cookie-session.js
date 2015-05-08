var loopback = require('loopback');

module.exports = function (app) {
  app.use(loopback.cookieParser(app.get('cookieSecret')));
  app.use(loopback.session({
    secret: 'kitty',
    saveUninitialized: true,
    resave: true
  }));
};
