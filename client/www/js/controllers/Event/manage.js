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
        $scope.records = tickets.map(function(ticket) {
          return ticket.event;
        }).filter(function(event) {
          return Date.parse(event.endAt) > now;
        });
      });
    };
    $scope.listManageable = function() {
      $scope.records =
        FestUser.events({id: $scope.currentUser.id}).filter(function(event) {
          return Date.parse(event.endAt) > now;
        });
    }
    $scope.listEntry();
  }]);
})();
