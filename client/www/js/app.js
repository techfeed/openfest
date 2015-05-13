(function() {
  ons.bootstrap('app', ['pascalprecht.translate', 'ui.router', 'lbServices', 'ngCookies']);
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
          "index": {
            "url": "/index",
            "templateUrl": "views/Event/list.html",
            "controller": "EventListController"
          },
          "login": {
            "url": "/login",
            "templateUrl": "views/user/login.html",
            "controller": "UserLoginController"
          },
          "logout": {
            "url": "/logout",
            "controller": "UserLogoutController"
          },
          "signup": {
            "url": "/signup",
            "templateUrl": "views/user/signup.html",
            "controller": "UserSignUpController"
          },
          "user-profile": {
            "url": "/user/profile",
            "templateUrl": "views/user/profile.html",
            "controller": "UserProfileController",
            "authenticate": true
          },
          "user-edit": {
            "url": "/user/edit",
            "templateUrl": "views/user/edit.html",
            "controller": "UserEditController",
            "authenticate": true
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
            "url": "/manage?list",
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
    .run(['$rootScope', '$state', 'AuthService', function($rootScope, $state, AuthService) {

      AuthService.remember();
      initRoutes();

      $rootScope.$on('error', function(event, msg) {
        alertMsg('Error', msg);
      });

      function alertMsg(title, msg) {
        ons.notification.alert({
          title: title,
          message: msg,
          buttonLabel: 'OK',
          animation: 'default'
        });
      }

      function initRoutes() {
        $rootScope.$on('$stateChangeStart', function (event, next) {
          // redirect to login page if not logged in
          if (next.authenticate && !$rootScope.currentUser) {
            event.preventDefault(); //prevent current page from loading
            console.log('not loggined.');
            $state.go('login', {next: next.name});
          }
        });

      }

    }]);
})();
