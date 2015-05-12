(function() {
  var app = angular.module('app');
  app.controller('EventAddController', ['$scope', 'Event', '$rootScope', '$state', '$translate',
    function($scope, Event, $rootScope, $state, $translate) {
      $scope.save = function() {
        var _title = $scope.record.title;
        var _subtitle = $scope.record.subtitle;
        var _description = $scope.record.description;
        var _logoUrl = $scope.record.logoUrl;
        var _place = $scope.record.place;
        var _amountOfTicket = $scope.record.amountOfTicket;
        _amountOfTicket = Number(_amountOfTicket);
        var _startAt = $scope.record.startAt;
        _startAt = new Date(_startAt).toISOString();
        var _endAt = $scope.record.endAt;
        _endAt = new Date(_endAt).toISOString();
        var _published = $scope.record.published;
        _published = !!_published;
        /*
        var _publishedAt = $scope.record.publishedAt;
        _publishedAt = new Date(_publishedAt).toISOString();
        var _createdAt = $scope.record.createdAt;
        _createdAt = new Date(_createdAt).toISOString();
        var _updatedAt = $scope.record.updatedAt;
        _updatedAt = new Date(_updatedAt).toISOString();
        */

        var requestParams = {};
        requestParams['title'] = _title;
        requestParams['subtitle'] = _subtitle;
        requestParams['description'] = _description;
        requestParams['logoUrl'] = _logoUrl;
        requestParams['place'] = _place;
        requestParams['amountOfTicket'] = _amountOfTicket;
        requestParams['startAt'] = _startAt;
        requestParams['endAt'] = _endAt;
        requestParams['published'] = _published;
        /*
        requestParams['publishedAt'] = _publishedAt;
        requestParams['createdAt'] = _createdAt;
        requestParams['updatedAt'] = _updatedAt;
        */
        var createEvent = function() {
          Event.create(requestParams)
            .$promise
            .then(function(record) {
              $state.go('Event.detail', {
                id: record.id
              });
            });
        };
        if (_published) {
          $translate('page.Event.common.confirmPublishing').then(function(msg) {
            ons.notification.confirm({
              message: msg,
              title: 'Alert',
              buttonLabels: ['Yes', 'No'],
              primaryButtonIndex: 1,
              cancelable: true,
              callback: function(index) {
                if (index !== 0) {
                  return;
                }
                createEvent();
              }
            });
          });
        } else {
          createEvent();
        }
      };
    }
  ]);
})();
