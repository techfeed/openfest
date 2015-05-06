angular
  .module('app')
  .controller('AuthLoginController', ['$scope', 'AuthService', '$state',
      function($scope, AuthService, $state, $rootScope) {
    $scope.user = {
      email: 'example@example.com',
      password: 'password'
    };

    $scope.login = function() {
      AuthService.login($scope.user.email, $scope.user.password)
        .then(function() {
          $state.go('all-events');
        })
        .catch(function(resp) {
          $scope.$emit('msg', {
            type: 'error',
            message: resp.data.error.message
          });
        });
    };
  }])
  .controller('AuthLogoutController', ['$scope', 'AuthService', '$state',
      function($scope, AuthService, $state) {
    AuthService.logout()
      .then(function() {
        $state.go('all-events');
      });
  }])
  .controller('SignUpController', ['$scope', 'AuthService', '$state',
      function($scope, AuthService, $state) {
    $scope.user = {
      email: 'example@example.com'
    };

    $scope.register = function() {
      AuthService.register($scope.user.email)
        .then(function() {
          $state.transitionTo('sign-up-success');
        })
        .catch(function(resp) {
          $scope.$emit('msg', {
            type: 'error',
            message: resp.data.error.message
          });
        });
    };
  }]);
