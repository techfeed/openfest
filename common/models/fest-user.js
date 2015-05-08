var loopback = require('loopback');
var Q = require('q');
var fs = require('fs');
var mailConfig = require('../../server/mail-config');
var extend = require('util')._extend;

module.exports = function(FestUser) {

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

  function verifyEmail(context, user) {
    var d = Q.defer();
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

    user.verify(options, function(err, response) {
      if (err) {
        d.reject(err);
        return next(err);
      } else {
        d.resolve(user);
      }
    });
    return d.promise;
  }

  function createAccessToken(user) {
    var d = Q.defer();
    user.accessTokens.create({
      ttl: Math.min(FestUser.settings.ttl, FestUser.settings.maxTTL)
    }, function(err, token) {
      if (err) {
        d.reject(err);
      } else {
        d.resolve(token);
      }
    });
    return d.promise;
  }

  /**
   * Verify email after call create user api.
   * Email settings are provided mail-config. ex) to, from, template
   * That email messages support i18n.
   */
  FestUser.afterRemote('create', function(context, user, next) {

    var promise1 = verifyEmail(context, user, next);
    var promise2 = createAccessToken(user);

    Q.all([promise1, promise2])
      .then(function(args) {
        var token = extend({
          user: args[0]
        }, args[1].__data);
        context.res.send(token);
      })
      .fail(function(err) {
        next(err);
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
