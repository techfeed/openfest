var i18n = require('i18n');
var path = require('path');

/**
 * i18n middleware
 * @param options
 * @returns {Function}
 */
module.exports = function(options) {

  if (options.directory && !options.directory.match(/^\//)) {
    options.directory = path.join(__dirname, '..', options.directory);
  }

  i18n.configure(options);

  return i18n.init;
};
