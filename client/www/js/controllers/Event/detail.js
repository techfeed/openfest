(function() {
  var app = angular.module('app');

  app.controller('EventDetailController', ['$scope', 'Event', '$state', '$translate', function($scope,
    Event, $state, $translate) {
    var recordId = $state.params.id;
    $scope.record = Event.findById({
      id: recordId
    });
    $scope.eventOwner = Event.owner({id: recordId});

    $scope.remove = function() {
      $translate('page.Event.delete.confirm').then(function(msg) {
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
            Event.removeById({
                id: recordId
              })
              .$promise
              .then(function() {
                $state.go('Event.list');
              });
          }
        });
      });
    };
  }]);
})();
