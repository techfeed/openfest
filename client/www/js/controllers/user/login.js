(function() {
  var app = angular.module('app');
  app.controller('UserLoginController', function ($scope, AuthService, $state) {

    $scope.user = {
      email: '',
      password: ''
    };

    $scope.login = function () {
      AuthService.login($scope.user)
        .then(function () {
          $state.go('index');
        }).catch(function (resp) {
          var msg = resp.message ? resp.message :
            resp.data ? resp.data.error.message : 'not connected.';
          $scope.$emit('error', msg);
        });
    };

    $scope.signup = function () {
      $state.go('signup');
    };

    $scope.socialLogin = function (provider) {
      AuthService.socialLogin(provider);
    };

  });


})();
