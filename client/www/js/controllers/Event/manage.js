(function() {
  var app = angular.module('app');
  app.controller('EventManageController', ['$scope', 'Event', 'FestUser', 'Ticket', '$state', function($scope,
    Event, FestUser, Ticket, $state) {
    $scope.listEntry = function() {
      $scope.records = FestUser.tickets({id: $scope.currentUser.id});
    };
    $scope.listManageable = function() {
      $scope.records = FestUser.events({id: $scope.currentUser.id});
    }
    $scope.listEntry();
  }]);
})();
