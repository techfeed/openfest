(function() {
  var app = angular.module('app');
  app.controller('UserAddController', ['$scope', 'User', '$rootScope', '$state',
    function($scope, User, $rootScope, $state) {
      $scope.save = function() {
        var _realm = $scope.record.realm;
        var _username = $scope.record.username;
        var _password = $scope.record.password;
        var _credentials = $scope.record.credentials;
        var _challenges = $scope.record.challenges;
        var _email = $scope.record.email;
        var _emailVerified = $scope.record.emailVerified;
        var _verificationToken = $scope.record.verificationToken;
        var _status = $scope.record.status;
        var _created = $scope.record.created;
        var _lastUpdated = $scope.record.lastUpdated;

        var requestParams = {};
        requestParams['realm'] = _realm;
        requestParams['username'] = _username;
        requestParams['password'] = _password;
        requestParams['credentials'] = _credentials;
        requestParams['challenges'] = _challenges;
        requestParams['email'] = _email;
        requestParams['emailVerified'] = _emailVerified;
        requestParams['verificationToken'] = _verificationToken;
        requestParams['status'] = _status;
        requestParams['created'] = _created;
        requestParams['lastUpdated'] = _lastUpdated;

        User.create(requestParams)
          .$promise
          .then(function(record) {
            $state.go('User.detail', {
              id: record.id
            });
          });
      };
    }
  ]);
})();