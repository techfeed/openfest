angular
  .module('app', [
    'ui.router',
    'lbServices',
    'Routing'
  ])
  .config(['$locationProvider', 'routerProvider',
    function($locationProvider, routerProvider) {

      $locationProvider.html5Mode(true);
      routerProvider.init({
        url: 'js/routes.json',
        otherwise: 'all-events'
      })
  }])
  .run(['$rootScope', '$state', 'router',
    function($rootScope, $state, router) {

      $rootScope.$on('$stateChangeStart', function(event, next) {
        // redirect to login page if not logged in
        if (next.authenticate && !$rootScope.currentUser) {
          event.preventDefault(); //prevent current page from loading
          $state.go('forbidden');
        }
      });

      $rootScope.$on('$stateChangeSuccess', function(event, next) {
        if ($state.current.name === 'sign-up-verified' ||
          $state.current.name === 'sign-up-success') {
          $rootScope.enableNav = false;
        } else {
          $rootScope.enableNav = true;
        }
      });

  }]);
