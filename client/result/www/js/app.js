angular
  .module('app', [
    'ui.router',
    'lbServices'
  ])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {
      //$locationProvider.html5Mode(true);
              $stateProvider
          .state('/events/list', {
            url: '/events/list',
            controller: 'EventListController'
          });
        $stateProvider
          .state('/events/add', {
            url: '/events/add',
            controller: 'EventAddController'
          });
              $stateProvider
          .state('/tickets/list', {
            url: '/tickets/list',
            controller: 'TicketListController'
          });
        $stateProvider
          .state('/tickets/add', {
            url: '/tickets/add',
            controller: 'TicketAddController'
          });
              $stateProvider
          .state('/userGroups/list', {
            url: '/userGroups/list',
            controller: 'UserGroupListController'
          });
        $stateProvider
          .state('/userGroups/add', {
            url: '/userGroups/add',
            controller: 'UserGroupAddController'
          });
          }])
  .run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(event, next) {
      if (next.authenticate && !$rootScope.currentUser) {
        event.preventDefault(); //prevent current page from loading
        $state.go('forbidden');
      }
    });
  }]);
