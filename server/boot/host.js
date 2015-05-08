module.exports = function(app) {
  // configure view handler
  app.set('host', process.env.HOST || 'localhost');
  app.set('port', process.env.PORT || 3000);
};
