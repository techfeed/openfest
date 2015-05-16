
module.exports = function(app) {
  var baseUrl = process.env.SERVICE_URL || app.get('url');

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
      'clientID': process.env.FACEBOOK_API_KEY || 'your api key',
      'clientSecret': process.env.FACEBOOK_API_SECRET || 'your secret',
      'callbackURL': baseUrl + '/auth/facebook/callback',
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
      'callbackURL': baseUrl + '/auth/twitter/callback',
      'authPath': '/auth/twitter',
      'callbackPath': '/auth/twitter/callback',
      'successRedirect': '/auth/account',
      'failureRedirect': '/login',
      'consumerKey': process.env.TWITTER_API_KEY || 'your api key',
      'consumerSecret': process.env.TWITTER_API_SECRET || 'your secret',
      'failureFlash': true
    },
    'google-login': {
      'provider': 'google',
      'module': 'passport-google-oauth',
      'strategy': 'OAuth2Strategy',
      'clientID': process.env.GOOGLE_API_KEY || 'your api key',
      'clientSecret': process.env.GOOGLE_API_SECRET || 'your secret',
      'callbackURL': baseUrl + '/auth/google/callback',
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
      'clientID': process.env.FACEBOOK_API_KEY || 'your api key',
      'clientSecret': process.env.FACEBOOK_API_SECRET || 'your secret',
      'callbackURL': baseUrl + '/link/facebook/callback',
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
      'callbackURL': baseUrl + '/link/twitter/callback',
      'authPath': '/link/twitter',
      'callbackPath': '/link/twitter/callback',
      'successRedirect': '/auth/account',
      'failureRedirect': '/login',
      'consumerKey': process.env.TWITTER_API_KEY || 'your api key',
      'consumerSecret': process.env.TWITTER_API_SECRET || 'your secret',
      'link': true,
      'failureFlash': true
    },
    'google-link': {
      'provider': 'google',
      'module': 'passport-google-oauth',
      'strategy': 'OAuth2Strategy',
      'clientID': process.env.GOOGLE_API_KEY || 'your api key',
      'clientSecret': process.env.GOOGLE_API_SECRET || 'your secret',
      'callbackURL': baseUrl + '/link/google/callback',
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


