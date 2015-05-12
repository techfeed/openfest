var debug = require('debug')('routes');

module.exports = function(app) {

  var viewStates = require('../../client/www/js/view-states');
  for (var stateName in viewStates) {
    var state = viewStates[stateName];
    var splits = stateName.split('.');
    var paths = [];
    var ancestorStateNames = [];
    for (var i = 0; i < splits.length; i++) {
      ancestorStateNames.push(splits[i]);
      var ancestorStateName = ancestorStateNames.join('.');
      if (ancestorStateName === '') {
        continue;
      }
      var ancestorState = viewStates[ancestorStateName];
      if (!ancestorState) {
        throw 'State [' + ancestorStateName + '] is not found.';
      }
      if (!ancestorState.url) {
        throw 'State [' + ancestorStateName + '] has no URL.';
      }
      paths.push(ancestorState.url);
    }
    var fullUrl = paths.join('');
    debug('The URL of state[' + stateName + '] is registered as [' + fullUrl + ']');
    app.get(fullUrl, function(req, res) {
      res.sendFile('/client/www/index.html', {root: './'});
    });
  }
};
