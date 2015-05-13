(function() {
  var app = angular.module('app');
  app.controller('EventListController', ['$scope', 'Event', function($scope,
    Event) {
    $scope.records = Event.find({
      filter: {
        where: {
          published: true,
          endAt: { gt: new Date() }
        }
      }
    });
  }]);
})();
