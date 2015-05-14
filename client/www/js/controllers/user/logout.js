(function() {
  var app = angular.module('app');
  app.controller('UserLogoutController', function ($scope, AuthService, $state) {

    AuthService.logout()
      .finally(function(){
        $state.go('login');
      });

  });


})();
