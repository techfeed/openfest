(function() {
  var app = angular.module('app');

  app.controller('EventDetailController', ['$scope', 'Event', '$state', function($scope,
    Event, $state) {
    var recordId = $state.params.id;
    $scope.record = Event.findById({
      id: recordId
    });

    $scope.remove = function() {
      ons.notification.confirm({
        message: 'Are you sure?',
        title: 'Alert',
        buttonLabels: ['Yes', 'No'],
        primaryButtonIndex: 1,
        cancelable: true,
        callback: function(index) {
          if (index !== 0) {
            return;
          }
          Event.removeById({
              id: recordId
            })
            .$promise
            .then(function() {
              $state.go('Event.list');
            });
        }
      });
    };
  }]);
})();