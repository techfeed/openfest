var loopback = require('loopback');
var mailConfig = require('../../server/mail-config');
var extend = require('util')._extend;

module.exports = function(FestUser) {

  FestUser.afterRemote('create', function(context, user, next) {
    var options = extend({
      type      : 'email',
      to        : user.email,
      from      : 'verify@example.com',
      subject   : context.res.__('mail.verify.subject'),
      text      : context.res.__('mail.verify.text'),
      template  : '../../server/mails/verify.ejs',
      redirect  : '/verified',
      user      : user
    }, mailConfig.emailVerify);

    user.verify(options, function(err, response) {
      if (err) {
        next(err);
        return;
      }
      var res = {
        to: options.to,
        from: options.from,
        msg: 'verification email sent.'
      };
      context.res.send(res);
    });
  });

  //send password reset link when requested
  //FestUser.on('resetPasswordRequest', function(info) {
  //  var url = 'http://' + config.host + ':' + config.port + '/reset-password';
  //  var html = 'Click <a href="' + url + '?access_token=' +
  //    info.accessToken.id + '">here</a> to reset your password';
  //
  //  user.app.models.Email.send({
  //    to: info.email,
  //    from: info.email,
  //    subject: 'Password reset',
  //    html: html
  //  }, function(err) {
  //    if (err) return console.log('> error sending password reset email');
  //    console.log('> sending password reset email to:', info.email);
  //  });
  //});
};
