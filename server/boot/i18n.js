var i18n = require('i18n');

module.exports = function(app) {

  i18n.configure({
    locales: ['ja', 'en'],
    directory: __dirname + '/../../common/locales'
  });
  app.middleware('initial', i18n.init);

};
