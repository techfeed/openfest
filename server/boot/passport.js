var loopback = require('loopback');
var fs = require('fs');
var path = require('path');

var loopbackPassport = require('loopback-component-passport');
var PassportConfigurator = loopbackPassport.PassportConfigurator;

module.exports = function (app) {
  var passportConfigurator = new PassportConfigurator(app);
  var localConfFile = path.join(__dirname, '..', '/providers.local.js');
  if (fs.existsSync(localConfFile)) {
    require(localConfFile);
  }
  var config = {};
  try {
    config = require('../providers');
  } catch (err) {
    console.trace(err);
    process.exit(1); // fatal
  }

  app.use(loopback.token({
    model: app.models.FestAccessToken
  }));

  app.use(loopback.cookieParser(app.get('cookieSecret')));
  app.use(loopback.session({
    secret: 'kitty',
    saveUninitialized: true,
    resave: true
  }));

  passportConfigurator.init();
  passportConfigurator.setupModels({
    userModel: app.models.FestUser,
    userIdentityModel: app.models.FestUserIdentity,
    userCredentialModel: app.models.FestUserCredential
  });
  for (var s in config) {
    var c = config[s];
    c.session = c.session !== false;
    passportConfigurator.configureProvider(s, c);
  }

  app.get('/auth/account', function(req, res) {
    if (!req.user) {
      res.status(401).send('Unauthorized');
    } else {
      res.render('auth/account', {
        user: req.user,
        accessToken: req.signedCookies.access_token,
        url: req.url
      });
    }
  });


};
