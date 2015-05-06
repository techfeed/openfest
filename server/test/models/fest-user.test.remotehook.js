/**
 * User test
 */
var lt = require('loopback-testing');
var app = require('../../server.js'); //path to app.js or server.js
var expect = require('chai').expect;

describe('User Remote hooks test', function() {

  var User = app.models.FestUser;
  var UserAPI = '/api/FestUsers';
  lt.beforeEach.withApp(app);

  var beforeCountCalled, afterCountCalled;

  beforeEach(function(){
    beforeCountCalled = false;
    afterCountCalled = false;
  });

  User.beforeRemote('count', function(ctx, model, next) {
    beforeCountCalled = true;
    next();
  });
  User.afterRemote('count', function(ctx, model, next) {
    afterCountCalled = true;
    next();
  });

  describe('Remote hook is enable when using REST API', function() {

    describe('ACL allow count', function() {
      var countAcl = {
        principalType: 'ROLE',
        principalId: '$everyone',
        permission: 'ALLOW',
        property: 'count'
      };
      User.settings.acls.push(countAcl);
      lt.describe.whenCalledRemotely('GET', UserAPI + '/count', function () {
        it('get count with beforeRemote and afterRemote.', function (done) {
          expect(beforeCountCalled).to.be.true;
          expect(afterCountCalled).to.be.true;
          done();
        });
      });
    });
  });

  describe('Remote hook is not enable when using Model API', function() {
    it('get count without beforeRemote and afterRemote.', function(done){
      User.count(function(err, count){
        expect(count).to.equal(2);
        expect(beforeCountCalled).to.be.false;
        expect(afterCountCalled).to.be.false;
        done();
      });
    });
  });
});
