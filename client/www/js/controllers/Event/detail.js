(function() {
  var app = angular.module('app');

  app.controller('EventDetailController', ['$scope', 'Event', 'Ticket', '$state', '$translate', '$q', function($scope,
    Event, Ticket, $state, $translate, $q) {

    var currentUser = $scope.currentUser;

    var recordId = $state.params.id;
    $scope.record = Event.findById({
      id: recordId,
      filter: {
        include: [
          { tickets: 'purchaser' },
          'owner'
        ]
      }
    });
    $scope.record
      .$promise
      .then(function(event) {
        $scope.didIEntry = event.tickets.some(function(ticket, index) {
          return ticket.purchaser.id === currentUser.id;
        });
      });
      
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

    $scope.entry = function() {
      var params = {};
      params.ticketNo = Math.floor(Math.random() * 100000);
      params.purchaserId = currentUser.id;
      params.eventId = recordId;
      params.issuedAt = new Date();
      Ticket
        .create(params)
        .$promise
        .then(function() {
          $state.reload();
        });
    };
  }]);
})();
