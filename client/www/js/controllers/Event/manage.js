(function() {
  var app = angular.module('app');
  app.controller('EventManageController', ['$scope', 'Event', 'FestUser', 'Ticket', '$state', function($scope,
    Event, FestUser, Ticket, $state) {
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
        });
      });
    };
    $scope.listManageable = function() {
      $scope.records = FestUser.events({id: $scope.currentUser.id});
    }
    $scope.listEntry();
  }]);
})();
