(function() {
  var app = angular.module('app');

  app.controller('TicketListController', ['$scope', 'Ticket', function($scope,
    Ticket) {
    $scope.records = Ticket.find();
  }]);
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
  app.controller('TicketAddController', ['$scope', 'Ticket', '$rootScope', '$state',
    function($scope, Ticket, $rootScope, $state) {
      $scope.save = function() {
        var _ticketNo = $scope.record.ticketNo;
        var _issuedAt = $scope.record.issuedAt;
        _issuedAt = new Date(_issuedAt).toISOString();
        var _attendedAt = $scope.record.attendedAt;
        _attendedAt = new Date(_attendedAt).toISOString();
        var _cancelledAt = $scope.record.cancelledAt;
        _cancelledAt = new Date(_cancelledAt).toISOString();

        var requestParams = {};
        requestParams['ticketNo'] = _ticketNo;
        requestParams['issuedAt'] = _issuedAt;
        requestParams['attendedAt'] = _attendedAt;
        requestParams['cancelledAt'] = _cancelledAt;

        Ticket.create(requestParams)
          .$promise
          .then(function(record) {
            $state.go('Ticket.detail', {
              id: record.id
            });
          });
      };
    }
  ])
  app.controller('TicketEditController', ['$scope', 'Ticket', '$rootScope', '$state',
    function($scope, Ticket, $rootScope, $state) {
      var recordId = $state.params.id;
      $scope.record = Ticket.findById({
        id: recordId
      });
      $scope.save = function() {
        var _ticketNo = $scope.record.ticketNo;
        var _issuedAt = $scope.record.issuedAt;
        _issuedAt = new Date(_issuedAt).toISOString();
        var _attendedAt = $scope.record.attendedAt;
        _attendedAt = new Date(_attendedAt).toISOString();
        var _cancelledAt = $scope.record.cancelledAt;
        _cancelledAt = new Date(_cancelledAt).toISOString();

        var requestParams = {
          id: recordId
        };
        requestParams['ticketNo'] = _ticketNo;
        requestParams['issuedAt'] = _issuedAt;
        requestParams['attendedAt'] = _attendedAt;
        requestParams['cancelledAt'] = _cancelledAt;

        Ticket.update({
            where: {
              id: recordId
            }
          }, requestParams)
          .$promise
          .then(function(record) {
            $state.go('Ticket.detail', {
              id: recordId
            });
          });
      };
    }
  ]);
})();