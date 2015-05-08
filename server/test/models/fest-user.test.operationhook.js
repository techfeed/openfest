/**
 * User test
 */
var lt = require('loopback-testing');
var app = require('../../server.js'); //path to app.js or server.js
var expect = require('chai').expect;
var userData = require('./user-data');

describe('User Operation hooks test', function() {

  var User = app.models.FestUser;
  var UserAPI = '/api/FestUsers';
  lt.beforeEach.withApp(app);

  var beforeSaveCalled, afterSaveCalled;

  beforeEach(function(){
    beforeSaveCalled = false;
    afterSaveCalled = false;
  });

  User.observe('before save', function(ctx, next) {
    beforeSaveCalled = true;
    next();
  });

  User.observe('after save', function(ctx, next) {
    afterSaveCalled = true;
    next();
  });

  var loginData = {
    email: userData.users[1].email,
    password: userData.users[1].password
  };

  describe('Operation hook is enable when using REST API', function() {

    lt.describe.whenCalledRemotely('POST', UserAPI + '/login',
      loginData, function() {
      var tokenId, userId;
      it('can get access token.', function() {
        expect(this.res.body.error).to.be.undefined;
        tokenId = this.res.body.id;
        userId = this.res.body.userId;
        expect(tokenId).to.not.be.undefined;
        expect(userId).to.not.be.undefined;
        expect(beforeSaveCalled).to.be.false;
        expect(afterSaveCalled).to.be.false;

        lt.beforeEach.withApp(app);
        var updateData = {
          username: 'save-rest-test'
        };
        var url = UserAPI + '/' + userId + '?access_token=' + tokenId;
        lt.describe.whenCalledRemotely('PUT', url, updateData, function() {
          it('save username', function() {
            expect(this.res.body.error).to.be.undefined;
            expect(this.res.body.username).to.equal(updateData.username);
            expect(beforeSaveCalled).to.be.true;
            expect(afterSaveCalled).to.be.true;
          });
        });
      });
    });
  });

  describe('Operation hook is enable when using Model API', function() {
    it('get user, change username and save', function(done) {
      User.findOne({where: {email: loginData.email} }, function(err, user){
        //console.log(user);
        expect(user.email).to.equal(loginData.email);

        user.username = 'save-node-test';
        user.save(function(err, model) {
          expect(model.username).to.equal('save-node-test');
          expect(beforeSaveCalled).to.be.true;
          expect(afterSaveCalled).to.be.true;
          done();
        });
      });
    });
  });

});
