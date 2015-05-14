(function() {
  var app = angular.module('app');

  app.controller('EventDetailController', ['$scope', 'Event', 'Ticket', '$state', '$translate', '$q', function($scope,
    Event, Ticket, $state, $translate, $q) {

    $scope.iamOwner = false;
    $scope.myTicket = null;
    $scope.isFull = false;

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
        var tickets = event.validTickets = event.tickets.filter(function(ticket) {
          return !ticket.cancelledAt;
        });
        $scope.iamOwner = (event.owner.id == currentUser.id);
        $scope.myTicket = (function() {
          for (var i = 0, n = tickets.length; i < n; i++) {
            var ticket = tickets[i];
            if (ticket.purchaser.id === currentUser.id) {
              return ticket;
            }
          }
          return null;
        })();
        $scope.isFull = (event.validTickets.length >= event.amountOfTicket);
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
      Ticket
        .purchase({
          eventId: recordId,
          userId: currentUser.id
        })
        .$promise
        .then(function() {
          $state.reload();
        });
    };

    $scope.cancelEntry = function() {
      var ticket = $scope.myTicket;
      Ticket
        .cancel({
          ticketId: ticket.id,
          userId: currentUser.id
        })
        .$promise
        .then(function() {
          $state.reload();
        });
    };
  }]);
})();
