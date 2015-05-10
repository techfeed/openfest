(function() {
  var app = angular.module('app');

  app.controller('FestUserDetailController', ['$scope', 'FestUser', '$state', function($scope,
    FestUser, $state) {
    var recordId = $state.params.id;
    $scope.record = FestUser.findById({
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
          FestUser.removeById({
              id: recordId
            })
            .$promise
            .then(function() {
              $state.go('FestUser.list');
            });
        }
      });
    };
  }]);
})();
