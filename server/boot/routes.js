/**
 * routing
 * @param app
 */
module.exports = function(app) {

  app.get('/auth/account', function(req, res) {
    console.log('/auth/account: user', req.user);
    if (!req.user) {
      res.status(401).send('Unauthorized');
    } else {
      res.clearCookie('access_token');
      res.clearCookie('userId');
      res.render('auth_account', {
        user: req.user,
        accessTokenId: req.accessToken ? req.accessToken.id : null
      });
    }
  });

};
