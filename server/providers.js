
module.exports = function(app) {

  var providers =
  {
    'local': {
      'provider': 'local',
      'module': 'passport-local',
      'usernameField': 'username',
      'passwordField': 'password',
      'authPath': '/auth/local',
      'successRedirect': '/account',
      'failureRedirect': '/login',
      'failureFlash': true
    },
    'facebook-login': {
      'provider': 'facebook',
      'module': 'passport-facebook',
      'clientID': process.env.FACEBOOK_API_KEY,
      'clientSecret': process.env.FACEBOOK_API_SECRET,
      'callbackURL': app.get('url') + '/auth/facebook/callback',
      'authPath': '/auth/facebook',
      'callbackPath': '/auth/facebook/callback',
      'successRedirect': '/auth/account',
      'failureRedirect': '/login',
      'scope': ['email', 'public_profile', 'user_about_me'],
      'failureFlash': true
    },
    'twitter-login': {
      'provider': 'twitter',
      'authScheme': 'oauth',
      'module': 'passport-twitter',
      'callbackURL': app.get('url') + '/auth/twitter/callback',
      'authPath': '/auth/twitter',
      'callbackPath': '/auth/twitter/callback',
      'successRedirect': '/auth/account',
      'failureRedirect': '/login',
      'consumerKey': process.env.TWITTER_API_KEY,
      'consumerSecret': process.env.TWITTER_API_SECRET,
      'failureFlash': true
    },
    'google-login': {
      'provider': 'google',
      'module': 'passport-google-oauth',
      'strategy': 'OAuth2Strategy',
      'clientID': '{google-client-id-1}',
      'clientSecret': '{google-client-secret-1}',
      'callbackURL': app.get('url') + '/auth/google/callback',
      'authPath': '/auth/google',
      'callbackPath': '/auth/google/callback',
      'successRedirect': '/auth/account',
      'failureRedirect': '/login',
      'scope': ['email', 'profile'],
      'failureFlash': true
    },
    'facebook-link': {
      'provider': 'facebook',
      'module': 'passport-facebook',
      'clientID': process.env.FACEBOOK_API_KEY,
      'clientSecret': process.env.FACEBOOK_API_SECRET,
      'callbackURL': app.get('url') + '/link/facebook/callback',
      'authPath': '/link/facebook',
      'callbackPath': '/link/facebook/callback',
      'successRedirect': '/auth/account',
      'failureRedirect': '/login',
      'scope': ['email', 'public_profile', 'user_about_me'],
      'link': true,
      'failureFlash': true
    },
    'twitter-link': {
      'provider': 'twitter',
      'authScheme': 'oauth',
      'module': 'passport-twitter',
      'callbackURL': app.get('url') + '/link/twitter/callback',
      'authPath': '/link/twitter',
      'callbackPath': '/link/twitter/callback',
      'successRedirect': '/auth/account',
      'failureRedirect': '/login',
      'consumerKey': process.env.TWITTER_API_KEY,
      'consumerSecret': process.env.TWITTER_API_SECRET,
      'link': true,
      'failureFlash': true
    },
    'google-link': {
      'provider': 'google',
      'module': 'passport-google-oauth',
      'strategy': 'OAuth2Strategy',
      'clientID': '{google-client-id-2}',
      'clientSecret': '{google-client-secret-2}',
      'callbackURL': app.get('url') + '/link/google/callback',
      'authPath': '/link/google',
      'callbackPath': '/link/google/callback',
      'successRedirect': '/auth/account',
      'failureRedirect': '/login',
      'scope': ['email', 'profile'],
      'link': true,
      'failureFlash': true
    }
  };
  return providers;
};


