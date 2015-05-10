(function() {
  var app = angular.module('app');
  app.controller('TicketListController', ['$scope', 'Ticket', function($scope,
    Ticket) {
    $scope.records = Ticket.find();
  }]);
})();