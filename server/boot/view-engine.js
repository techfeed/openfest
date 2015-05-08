var path = require('path');

module.exports = function(app) {
  // configure view handler
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '..', 'views'));
};
