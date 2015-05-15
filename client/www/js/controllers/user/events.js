(function() {
  var app = angular.module('app');
  app.controller('UserEventsController', function($scope, Event, FestUser, $state, $stateParams) {

    var now = Date.now();

    console.log('$state.current.data', $state.current.data);
    console.log('$stateParams', $stateParams);


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
    };
    $scope.listEntry();
  });

})();
