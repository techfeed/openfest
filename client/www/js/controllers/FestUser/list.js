(function() {
  var app = angular.module('app');
  app.controller('FestUserListController', ['$scope', 'FestUser', function($scope,
    FestUser) {
    $scope.records = FestUser.find();
  }]);
})();
