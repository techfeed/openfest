(function() {
  var app = angular.module('app');
  app.controller('EventManageController', ['$scope', 'Event', function($scope,
    Event) {
    $scope.records = Event.find();
  }]);
})();
