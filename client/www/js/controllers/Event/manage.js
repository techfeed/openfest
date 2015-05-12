(function() {
  var app = angular.module('app');
  app.controller('EventManageController', ['$scope', 'Event', 'FestUser', 'Ticket', '$state', function($scope,
    Event, FestUser, Ticket, $state) {
    $scope.listEntry = function() {
      console.log('listEntry');
      $scope.records = FestUser.tickets({id: $scope.currentUser.id});
    };
    $scope.listManageable = function() {
      console.log('listManageable');
      $scope.records = FestUser.events({id: $scope.currentUser.id});
    }
    $scope.listEntry();
  }]);
})();
