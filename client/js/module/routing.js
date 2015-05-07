'use strict';

angular.module('Routing', ['ui.router'])
  .provider('router', function ($stateProvider, $urlRouterProvider) {

    var urlCollection, otherwise, routes;
    routes = {};

    this.$get = function ($http, $state, $q) {
      return {
        setUpRoutes: function() {
          var deferred = $q.defer();
          for (var routeName in routes) {
            if (!$state.get(routeName)) {
              $stateProvider.state(routeName, routes[routeName]);
            }
          }

          if (urlCollection) {
            $http.get(urlCollection)
              .success(function (routes) {
                for (var routeName in routes) {
                  if (!$state.get(routeName)) {
                    $stateProvider.state(routeName, routes[routeName]);
                  }
                }
                deferred.resolve($state);
              })
              .error(function (data, status, headers, config) {
                deferred.reject(data);
              })
              .finally(function() {
                $urlRouterProvider.otherwise(otherwise);
              });
          } else {
            deferred.resolve($state);
            $urlRouterProvider.otherwise(otherwise);
          }
          return deferred.promise;
        }
      }
    };

    this.init = function (config) {
      //routes = config.routes || {};
      urlCollection = config.url;
      otherwise = config.otherwise;
    };
  });
