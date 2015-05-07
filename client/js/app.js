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
  .run(['$rootScope', '$state', 'AuthService', 'router', '$q',
    function($rootScope, $state, AuthService, router, $q) {

      //router.setUpRoutes();
      //AuthService.remember();
      var d1 = $q.defer(),
          d2 = $q.defer();

      router.setUpRoutes()
        .finally(function(){d1.resolve();});
      AuthService.remember()
        .finally(function(){d2.resolve();});


      $q.all([d1.promise, d2.promise])
        .finally(function() {
          $rootScope.$broadcast('$locationChangeSuccess');
        });

      function isEnableUserInit(next) {
        return $rootScope.currentUser && $rootScope.currentUser.temporary &&
          next.name !== 'user-init' &&
          next.name !== 'logout';
      }

      function isForbidden(next) {
        if (next.authenticate && !$rootScope.currentUser) {
          return true;
        }
        if (next.name === 'user-init') {
          return !$rootScope.currentUser || !$rootScope.currentUser.temporary;
        }
        return false;
      }

      $rootScope.$on('$stateChangeStart', function(event, next) {
        // redirect to login page if not logged in
        if (isForbidden(next)) {
          event.preventDefault(); //prevent current page from loading
          $state.go('forbidden');
        } else if (isEnableUserInit(next)) {
          event.preventDefault();
          $state.go('user-init');
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
