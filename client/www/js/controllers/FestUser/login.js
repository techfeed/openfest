(function() {
  var app = angular.module('app');
  app.controller('FestUserLoginController', function ($scope, AuthService, $state, $rootScope) {

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
          alert('error: ' + msg);
        });
    };

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams) {
      if (toState.name === 'logout') {
        console.log('logout');
        AuthService.logout()
          .then(function(){
            $state.go('login');
          });
      }
    });

    $scope.signup = function () {
      $state.go('signup');
    };

    $scope.sociallogin = function (provider) {
      location.href = '/auth/' + provider;
    };
  });


})();
