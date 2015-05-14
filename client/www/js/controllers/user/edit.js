(function() {
  var app = angular.module('app');

  app.controller('UserEditController',
    function($scope, FestUser, $rootScope, $state, AuthService) {

      var dummyMailPattern = /.+@openfest-dummy\.org$/,
          dummyUserNamePattern = /.+\.openfest-dummy\.org$/,
          displayNamePattern = /^[a-zA-Z0-9\._-]+$/;

      var currentUser = $rootScope.currentUser;

      $scope.passwordChanged = false;

      $scope.user = angular.extend({}, currentUser);
      if (currentUser.isNew) {
        $scope.user.password = '';
        $scope.passwordChanged = true;
      } else {
        $scope.user.password = 'password';
      }
      $scope.user.password = currentUser.isNew ? '' : 'password';
      if (currentUser.email.match(dummyMailPattern)) {
        $scope.user.email = '';
      }
      if (currentUser.username.match(dummyUserNamePattern)) {
        if ($scope.user.displayName.match(displayNamePattern)) {
          $scope.user.username = $scope.user.displayName;
        } else {
          $scope.user.username = '';
        }
      }

      $scope.clearPassword = function() {
        if (!$scope.passwordChanged) {
          $scope.user.password = '';
        }
      };
      $scope.restorePassword = function() {
        if (!$scope.passwordChanged) {
          $scope.user.password = 'password';
        }
      };

      $scope.save = function() {
        var data = angular.extend({}, $scope.user);
        if (!$scope.passwordChanged) {
          delete data.password;
        }
        FestUser.prototype$updateAttributes(data)
          .$promise
          .then(function(user) {
            $rootScope.setCurrentUser(user);
            $state.go('user-profile');
          }).catch(function(resp) {
            var msg = resp.message ? resp.message :
              resp.data ? resp.data.error.message : 'not connected.';
            $scope.$emit('error', msg);

          });
      };

      $scope.socialLink = function(provider) {
        AuthService.socialLink(provider);
      }
    }
  );
})();
