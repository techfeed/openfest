var loopback = require('loopback');
var fs = require('fs');
var mailConfig = require('../../server/mail-config');
var extend = require('util')._extend;

module.exports = function(FestUser) {

  /**
   * Generate simple random password.
   * @param length password length
   * @returns {string} generated password
   */
  function generatePassword(length) {
    return Math.random().toString(36).slice(-(length || 12));
  }

  /**
   * insert locale name to template filename.
   * ex) /path/to/template.ejs -> /path/to/template.ja.ejs
   * @param template template file
   * @param locale locale[en|ja|...]
   * @returns {string} template file
   */
  function getLocaleTemplate(template, locale) {
    if (!locale) {
      return template;
    }
    var file = template.replace(/(.*)\.(.*)/, '$1.' + locale + '.$2');
    if (fs.existsSync(file)) {
      return file;
    } else {
      template;
    }
  }

  /**
   * Generate temporary password if password is not set
   * before call create user api.
   */
  FestUser.beforeRemote('create', function(context, user, next) {
    if (!context.req.body.password) {
      var password = generatePassword(12);
      context.req.body.password = password;
      context.req.body.temporaryPassword = password;
    }
    next();
  });

  /**
   * Verify email after call create user api.
   * Email settings are provided mail-config. ex) to, from, template
   * That email messages support i18n.
   */
  FestUser.afterRemote('create', function(context, user, next) {
    var options = extend({
      type      : 'email',
      to        : user.email,
      from      : 'verify@example.com',
      subject   : context.res.__('mail.verify.subject'),
      text      : context.res.__('mail.verify.text'),
      template  : 'verify.ejs',
      redirect  : '/verified',
      user      : user
    }, mailConfig.emailVerify);

    options.template = getLocaleTemplate(options.template, context.req.locale);
    options.text = options.text.replace('{password}', user.temporaryPassword);

    user.verify(options, function(err, response) {
      if (err) {
        return next(err);
      }
      var res = {
        to: options.to,
        from: options.from,
        msg: 'verification email sent.'
      };
      context.res.send(res);
    });
  });

  FestUser.prototype.isTemporary = function() {
    return !!this.temporaryPassword;
  };

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
