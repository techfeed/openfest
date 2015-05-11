(function() {
  var app = angular.module('app');
  app.controller('FestUserLogoutController', function ($scope, $rootScope, AuthService, $state) {

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams) {
      if (toState.name === 'logout') {
        console.log('logout');
        AuthService.logout()
          .then(function(){
            $state.go('login');
          });
      }
    });
  });

})();
