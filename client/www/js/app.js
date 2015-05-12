(function() {
  ons.bootstrap('app', ['pascalprecht.translate', 'ui.router', 'lbServices']);
  angular
    .module('app')
    .config(['$translateProvider', function($translateProvider) {
      // add translation table
      $translateProvider
        .useStaticFilesLoader({
          prefix: '/resources/messages_',
          suffix: '.json'
        })
        .preferredLanguage('ja')
        .useSanitizeValueStrategy('escaped');
    }])

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
      function($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/index');

        var routes = {
          "login": {
            "url": "/login",
            "templateUrl": "views/FestUser/login.html",
            "controller": "FestUserLoginController"
          },
          "logout": {
            "url": "/logout"
          },
          "signup": {
            "url": "/signup",
            "templateUrl": "views/FestUser/signup.html",
            "controller": "FestUserSignUpController"
          },
          "index": {
            "url": "/index",
            //"templateUrl": "views/index.html"
            "templateUrl": "views/Event/list.html",
            "controller": "EventListController"
          },
          "FestUser": {
            "url": "/FestUser",
            "template": "<ui-view/>",
            "abstract": true
          },
          "FestUser.list": {
            "url": "/list",
            "templateUrl": "views/FestUser/list.html",
            "controller": "FestUserListController"
          },
          "FestUser.add": {
            "url": "/add",
            "templateUrl": "views/FestUser/add.html",
            "controller": "FestUserAddController"
          },
          "FestUser.edit": {
            "url": "/:id/edit",
            "templateUrl": "views/FestUser/edit.html",
            "controller": "FestUserEditController"
          },
          "FestUser.detail": {
            "url": "/:id/detail",
            "templateUrl": "views/FestUser/detail.html",
            "controller": "FestUserDetailController"
          },
          "FestUser.delete": {
            "url": "/:id/delete",
            "templateUrl": "views/FestUser/delete.html",
            "controller": "FestUserDeleteController"
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
          "Event.manage": {
            "url": "/manage",
            "templateUrl": "views/Event/manage.html",
            "controller": "EventManageController"
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
    .run(['$rootScope', '$state', 'AuthService',
      function($rootScope, $state, AuthService) {
      AuthService.remember()
        .then(function(user) {
          if (user) {
            //$state.go('index');
          }
        });

      $rootScope.$on('$stateChangeStart', function(event, next) {
        // redirect to login page if not logged in
        if (next.authenticate && !$rootScope.currentUser) {
          event.preventDefault(); //prevent current page from loading
          $state.go('forbidden');
        }
      });
    }]);
})();
