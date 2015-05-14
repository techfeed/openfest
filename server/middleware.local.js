module.exports =
{
  "session": {
    "cookie-parser": {
      "params": [process.env.COOKIE_SECRET || "openfest-secret"]
    },
    "express-session": {
      "params": {
        "secret": process.env.COOKIE_SECRET || "openfest-secret",
        "saveUninitialized": true,
        "resave": true
      }
    }
  }
};
