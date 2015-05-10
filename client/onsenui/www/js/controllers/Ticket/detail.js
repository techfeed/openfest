(function() {
  var app = angular.module('app');

  app.controller('TicketDetailController', ['$scope', 'Ticket', '$state', function($scope,
    Ticket, $state) {
    var recordId = $state.params.id;
    $scope.record = Ticket.findById({
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
          Ticket.removeById({
              id: recordId
            })
            .$promise
            .then(function() {
              $state.go('Ticket.list');
            });
        }
      });
    };
  }]);
})();