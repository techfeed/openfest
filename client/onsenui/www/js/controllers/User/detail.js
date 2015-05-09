(function() {
  var app = angular.module('app');

  app.controller('UserDetailController', ['$scope', 'User', '$state', function($scope,
    User, $state) {
    var recordId = $state.params.id;
    $scope.record = User.findById({
      id: recordId
    });

    $scope.remove = function() {
      ons.notification.confirm({
        message: 'Are you sure?',
        title: 'Alert',
        buttonLabels: ['Yes', 'No'],
        primaryButtonIndex: 1,
        cancelable: true,
        callback: function(index) {
          if (index !== 0) {
            return;
          }
          User.removeById({
              id: recordId
            })
            .$promise
            .then(function() {
              $state.go('User.list');
            });
        }
      });
    };
  }]);
})();