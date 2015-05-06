'use strict';

angular.module('Routing', ['ui.router'])
  .provider('router', function ($stateProvider, $urlRouterProvider) {

    var urlCollection, otherwise;
    var STATE_LOADED = 'router.stateLoaded';

    var routes =
    {
      "login": {
        "url": "/login",
        "controller": "AuthLoginController",
        "templateUrl": "views/login.html"
      },
      "logout": {
        "url": "/logout",
        "controller": "AuthLogoutController"
      },
      "forbidden": {
        "url": "/forbidden",
        "templateUrl": "views/forbidden.html"
      },

      "all-events": {
        "url": "/all-events",
        "controller": "AllEventsController",
        "templateUrl": "views/all-events.html"
      },
      "add-event": {
        "url": "/add-event",
        "controller": "AddEventController",
        "templateUrl": "views/event-form.html",
        "authenticate": true
      },

      "sign-up": {
        "url": "/sign-up",
        "controller": "SignUpController",
        "templateUrl": "views/sign-up-form.html"
      },
      "sign-up-success": {
        "url": "/sign-up/success",
        "templateUrl": "views/sign-up-success.html"
      },
      "sign-up-verified": {
        "url": "/sign-up/verified",
        "templateUrl": "views/sign-up-verified.html"
      }
    };

    this.$get = function ($http, $state, $rootScope) {
      return {
        STATE_LOADED: STATE_LOADED,
        setUpRoutes: function () {
          for (var routeName in routes) {
            if (!$state.get(routeName)) {
              $stateProvider.state(routeName, routes[routeName]);
            }
          }
          $urlRouterProvider.otherwise(otherwise);
          /*
          $http.get(urlCollection).success(function (routes) {
            for (var routeName in routes) {
              if (!$state.get(routeName)) {
                $stateProvider.state(routeName, routes[routeName]);
              }
            }
            $urlRouterProvider.otherwise(otherwise);
            $rootScope.$emit(STATE_LOADED, {
              url: urlCollection,
              collection: collection
            });
          });
          */
        }
      }
    };

    this.init = function (config) {
      urlCollection = config.url;
      otherwise = config.otherwise;
    };
  })

  .run(function (router) {
    router.setUpRoutes();
  });