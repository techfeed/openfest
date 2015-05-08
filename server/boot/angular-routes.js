module.exports = function(app) {
  var routes = require('../../client/js/routes');
  Object
    .keys(routes)
    .forEach(function(name) {
      var url = routes[name].url;
      app.get(url, function(req, res) {
        res.sendFile('/client/index.html', {root: './'});
      });
    });
};
