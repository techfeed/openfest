var loopback = require('loopback');
var Q = require('q');
var fs = require('fs');
var mailConfig = require('../../server/mail-config');
var extend = require('util')._extend;

module.exports = function(FestUser) {

  var PASSWORD_MIN_LENGTH = 6;

  /**
   * append locale to template filename.
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
   * send user verify email.
   * @param context
   * @param user
   * @returns {Promise}
   */
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
      } else {
        d.resolve(user);
      }
    });
    return d.promise;
  }

  /**
   * @overwrite
   * validate password length.
   * @param plain
   * @returns {boolean}
   */
  FestUser.validatePassword = function(plain) {
    var errMsg;
    if (!plain) {
      errMsg = 'Password is required.';
    } else if (typeof plain !== 'string') {
      errMsg = 'Invalid password.';
    } else if (plain.length < PASSWORD_MIN_LENGTH ) {
      errMsg = 'Password is too short.';
    } else {
      return true;
    }
    var err =  new Error(errMsg);
    err.statusCode = 422;
    throw err;
  };

  /**
   * Login after create user.
   */
  FestUser.afterRemote('create', function(context, user, next) {
    user.createAccessToken(context.req.ttl, function(err, token) {
      if (err) {
        return next(err);
      }
      var tokenJson = token.toJSON();
      tokenJson.user = user.toJSON();
      context.res.send(tokenJson);
    });

  });

  /**
   * verify email after create new user.
   */
  FestUser.observe('after save', function(ctx, next) {
    var user = ctx.instance;
    console.log('after save user:', user);
    if (ctx.isNewInstance) {
      //verifyEmail(loopback.getCurrentContext(), user);
    } else {
      if (user.isNew) {
        user.isNew = false;
        user.save();
      }
    }
    next();
  });


  FestUser.settings.validateUpsert = true;
  FestUser.validatesPresenceOf('username', { message: 'can not be blank' });
  FestUser.validatesPresenceOf('displayName', { message: 'can not be blank' });

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
