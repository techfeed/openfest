
var loopbackPassport = require('loopback-component-passport');
var PassportConfigurator = loopbackPassport.PassportConfigurator;

module.exports = function (app) {
  var passportConfigurator = new PassportConfigurator(app);
  var config = {};
  try {
    config = require('../providers.json');
  } catch (err) {
    console.trace(err);
    process.exit(1); // fatal
  }

  passportConfigurator.init();
  passportConfigurator.setupModels({
    userModel: app.models.FestUser,
    userIdentityModel: app.models.UserIdentity,
    userCredentialModel: app.models.UserCredential
  });
  for (var s in config) {
    var c = config[s];
    c.session = c.session !== false;
    passportConfigurator.configureProvider(s, c);
  }


};
