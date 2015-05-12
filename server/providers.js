var providers =
{
  "local": {
    "provider": "local",
    "module": "passport-local",
    "usernameField": "username",
    "passwordField": "password",
    "authPath": "/auth/local",
    "successRedirect": "/auth/account",
    "failureRedirect": "/local",
    "failureFlash": true
  },
  "facebook-login": {
    "provider": "facebook",
    "module": "passport-facebook",
    "clientID": process.env.FACEBOOK_API_KEY,
    "clientSecret": process.env.FACEBOOK_API_SECRET,
    "callbackURL": "http://localhost:3000/auth/facebook/callback",
    "authPath": "/auth/facebook",
    "callbackPath": "/auth/facebook/callback",
    "successRedirect": "/auth/account",
    "failureRedirect": "/login",
    "scope": ["email", "public_profile"],
    "failureFlash": true
  },
  "twitter-login": {
    "provider": "twitter",
    "authScheme": "oauth",
    "module": "passport-twitter",
    "callbackURL": "http://localhost:3000/auth/twitter/callback",
    "authPath": "/auth/twitter",
    "callbackPath": "/auth/twitter/callback",
    "successRedirect": "/auth/account",
    "failureRedirect": "/login",
    "consumerKey": process.env.TWITTER_API_KEY,
    "consumerSecret": process.env.TWITTER_API_SECRET,
    "failureFlash": true
  },
  "google-login": {
    "provider": "google",
    "module": "passport-google-oauth",
    "strategy": "OAuth2Strategy",
    "clientID": "{google-client-id-1}",
    "clientSecret": "{google-client-secret-1}",
    "callbackURL": "/auth/google/callback",
    "authPath": "/auth/google",
    "callbackPath": "/auth/google/callback",
    "successRedirect": "/auth/account",
    "failureRedirect": "/login",
    "scope": ["email", "profile"],
    "failureFlash": true
  },
  "facebook-link": {
    "provider": "facebook",
    "module": "passport-facebook",
    "clientID": process.env.FACEBOOK_API_KEY,
    "clientSecret": process.env.FACEBOOK_API_SECRET,
    "callbackURL": "/link/facebook/callback",
    "authPath": "/link/facebook",
    "callbackPath": "/link/facebook/callback",
    "successRedirect": "/auth/account",
    "failureRedirect": "/login",
    "scope": ["email", "public_profile"],
    "link": true,
    "failureFlash": true
  },
  "google-link": {
    "provider": "google",
    "module": "passport-google-oauth",
    "strategy": "OAuth2Strategy",
    "clientID": "{google-client-id-2}",
    "clientSecret": "{google-client-secret-2}",
    "callbackURL": "/link/google/callback",
    "authPath": "/link/google",
    "callbackPath": "/link/google/callback",
    "successRedirect": "/auth/account",
    "failureRedirect": "/login",
    "scope": ["email", "profile"],
    "link": true,
    "failureFlash": true
  }
};

module.exports = providers;

