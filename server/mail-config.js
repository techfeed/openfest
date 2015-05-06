var path = require('path');

module.exports = {
  emailVerify: {
    from: 'dev@openweb.co.jp',
    template: path.resolve(__dirname, 'mails/verify.ejs'),
    redirect: '/sign-up/verified'
  }
};
