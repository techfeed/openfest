module.exports = function(app) {
  var routes = require('../../client/js/routes');
  Object
    .keys(routes)
    .forEach(function(route) {
      app.get(route, function(req, res) {
        res.sendFile('/client/index.html', {root: './'});
      });
    });
};
