(function() {
  var app = angular.module('app');
  app.controller('UserListController', ['$scope', 'User', function($scope,
    User) {
    $scope.records = User.find();
  }]);
})();