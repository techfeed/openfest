(function() {
  ons.bootstrap('app', ['pascalprecht.translate', 'ui.router', 'lbServices']);
  angular
    .module('app')
    .config(['$translateProvider', function($translateProvider) {
      // add translation table
      $translateProvider
        .useStaticFilesLoader({
          prefix: '/onsenui/www/resources/messages_',
          suffix: '.json'
        })
        .preferredLanguage('en')
        .useSanitizeValueStrategy('escaped');
    }])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
      function($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/login');

        var routes = {
          "login": {
            "url": "/login",
            "templateUrl": "views/login.html",
            "controller": "LoginController"
          },
          "logout": {
            "url": "/logout",
            "controller": "LogoutController"
          },
          "sign-up": {
            "url": "/signup",
            "templateUrl": "views/sign-up.html",
            "controller": "SignUpController"
          },
          "index": {
            "url": "/index",
            "templateUrl": "views/index.html"
          },
          "User": {
            "url": "/User",
            "template": "<ui-view/>",
            "abstract": true
          },
          "User.list": {
            "url": "/list",
            "templateUrl": "views/User/list.html",
            "controller": "UserListController"
          },
          "User.add": {
            "url": "/add",
            "templateUrl": "views/User/add.html",
            "controller": "UserAddController"
          },
          "User.edit": {
            "url": "/:id/edit",
            "templateUrl": "views/User/edit.html",
            "controller": "UserEditController"
          },
          "User.detail": {
            "url": "/:id/detail",
            "templateUrl": "views/User/detail.html",
            "controller": "UserDetailController"
          },
          "User.delete": {
            "url": "/:id/delete",
            "templateUrl": "views/User/delete.html",
            "controller": "UserDeleteController"
          },
          "Event": {
            "url": "/Event",
            "template": "<ui-view/>",
            "abstract": true
          },
          "Event.list": {
            "url": "/list",
            "templateUrl": "views/Event/list.html",
            "controller": "EventListController"
          },
          "Event.add": {
            "url": "/add",
            "templateUrl": "views/Event/add.html",
            "controller": "EventAddController"
          },
          "Event.edit": {
            "url": "/:id/edit",
            "templateUrl": "views/Event/edit.html",
            "controller": "EventEditController"
          },
          "Event.detail": {
            "url": "/:id/detail",
            "templateUrl": "views/Event/detail.html",
            "controller": "EventDetailController"
          },
          "Event.delete": {
            "url": "/:id/delete",
            "templateUrl": "views/Event/delete.html",
            "controller": "EventDeleteController"
          },
          "Ticket": {
            "url": "/Ticket",
            "template": "<ui-view/>",
            "abstract": true
          },
          "Ticket.list": {
            "url": "/list",
            "templateUrl": "views/Ticket/list.html",
            "controller": "TicketListController"
          },
          "Ticket.add": {
            "url": "/add",
            "templateUrl": "views/Ticket/add.html",
            "controller": "TicketAddController"
          },
          "Ticket.edit": {
            "url": "/:id/edit",
            "templateUrl": "views/Ticket/edit.html",
            "controller": "TicketEditController"
          },
          "Ticket.detail": {
            "url": "/:id/detail",
            "templateUrl": "views/Ticket/detail.html",
            "controller": "TicketDetailController"
          },
          "Ticket.delete": {
            "url": "/:id/delete",
            "templateUrl": "views/Ticket/delete.html",
            "controller": "TicketDeleteController"
          },
          "": {}
        };
        for (var stateName in routes) {
          if (stateName !== "")
            $stateProvider.state(stateName, routes[stateName]);
        }
      }
    ])
    .run(['$rootScope', '$state', function($rootScope, $state) {
      $rootScope.$on('$stateChangeStart', function(event, next) {
        // redirect to login page if not logged in
        if (next.authenticate && !$rootScope.currentUser) {
          event.preventDefault(); //prevent current page from loading
          $state.go('forbidden');
        }
      });
    }]);
})();