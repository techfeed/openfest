/**
 * User test
 */
var lt = require('loopback-testing');
var app = require('../../server.js'); //path to app.js or server.js
var expect = require('chai').expect;
var userData = require('./user-data');
var qs = require('qs');

describe('User test', function() {

  var User = app.models.FestUser;
  var UserAPI = '/api/FestUsers';
  lt.beforeEach.withApp(app);

  require('i18n').setLocale('ja');

  describe('Create a new user using REST', function() {
    var data = userData.users[0];
    lt.beforeEach.cleanDatasource();
    lt.describe.whenCalledRemotely('POST', UserAPI, data, function() {
      var mailConfig = require('../../mail-config');
      it('should respond with verification.', function() {
        expect(this.res.body.to).to.equal(data.email);
        expect(this.res.body.from).to.equal(mailConfig.emailVerify.from);

        User.findOne({where: {email: data.email}}, function(err, user) {
          expect(user).to.be.not.null;
          var param = {
            uid: user.id.toString(),
            redirect: '/verified',
            token: user.verificationToken
          };
          var url = UserAPI + '/confirm?' + qs.stringify(param);
          lt.describe.whenCalledRemotely('GET', url, null, function() {
            it('should verify user', function() {
              expect(this.res.headers.location).to.equal('/verified');
            });
          });
        });
      });
    });
  });

  describe('Create a new user using model api', function() {
    var data = userData.users[1];
    it('should create a user.', function(done) {
        User.create(data, function(err, obj){
          expect(obj.username).to.equal(data.username);
          expect(obj.email).to.equal(data.email);
          expect(obj.password).not.to.equal(data.password);
          expect(obj.profile).to.equal(data.profile);
          expect(obj.icon).to.equal(data.icon);
          expect(obj.tmp).to.equal(data.tmp);

          obj.emailVerified = true;
          obj.save(function(err, obj2){
            expect(obj2.emailVerified).to.be.true;
            done();
          });
        });
    });

    it('should be 2 users.', function(done) {
      User.find(function(err, obj) {
        expect(obj.length).to.equal(2);
        done();
      });
    });
  });

});
