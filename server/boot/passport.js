var loopback = require('loopback');
var fs = require('fs');
var path = require('path');
var utils = require('../../node_modules/loopback-component-passport/lib/models/utils');


var loopbackPassport = require('loopback-component-passport');
var PassportConfigurator = loopbackPassport.PassportConfigurator;

var confFile = path.join(__dirname, '..', 'providers');
var configModule;
try {
  configModule = require(confFile);
} catch (err) {
  console.trace(err);
  process.exit(1); // fatal
}


function profileToUser(provider, profile) {
  // Let's create a user for that
  var username = provider + '.' + (profile.username || profile.id) + '.openfest-dummy.org';
  var email = profile.emails && profile.emails[0] && profile.emails[0].value;
  if (!email) {
    email = username + '@openfest-dummy.org';
  }
  var password = utils.generateKey('password');
  var displayName = profile.displayName || username;
  var userObj = {
    username: username,
    password: password,
    email: email,
    displayName: displayName
  };
  return userObj;
}

module.exports = function (app) {
  var passportConfigurator = new PassportConfigurator(app);

  app.use(loopback.token({
    model: app.models.FestAccessToken
  }));

  passportConfigurator.init();
  passportConfigurator.setupModels({
    userModel: app.models.FestUser,
    userIdentityModel: app.models.FestUserIdentity,
    userCredentialModel: app.models.FestUserCredential
  });

  var config = configModule(app);
  for (var s in config) {
    var c = config[s];
    c.session = c.session !== false;
    c.profileToUser = profileToUser;
    passportConfigurator.configureProvider(s, c);
  }

};
