(function() {
  var app = angular.module('app');
  app.controller('EventManageController', ['$scope', 'Event', 'FestUser', 'Ticket', '$state', function($scope,
    Event, FestUser, Ticket, $state) {

    var now = Date.now();

    $scope.listEntry = function() {
      FestUser.tickets({
        id: $scope.currentUser.id,
        filter: {
          include: 'event'
        }
      })
      .$promise
      .then(function(tickets) {
        $scope.records =
          tickets
            .filter(function(ticket) {
              return !ticket.cancelledAt;
            })
            .map(function(ticket) {
              return ticket.event;
            })
            .filter(function(event) {
              return Date.parse(event.endAt) > now;
            });
      });
    };
    $scope.listManageable = function() {
        FestUser
          .events({id: $scope.currentUser.id})
          .$promise
          .then(function(events) {
            $scope.records = events.filter(function(event) {
              return Date.parse(event.endAt) > now;
            });
          });
    }
    $scope.listEntry();
  }]);
})();
