angular
  .module('app')
  .controller('TicketListController', ['$scope', 'Ticket', function($scope,
    Ticket) {
    $scope.records = Ticket.find();
    $scope.showDetail = function(id) {
      myNavigator.pushPage('/onsenui/www/views/Tickets/detail.html', {
        animation: 'slide',
        recordId: id
      });
    };
  }])
  .controller('TicketDetailController', ['$scope', 'Ticket', function($scope,
    Ticket) {
    var page = myNavigator.getCurrentPage();
    var recordId = page.options.recordId;
    $scope.record = Ticket.findById({
      id: recordId
    });

    $scope.edit = function() {
      myNavigator.pushPage('/onsenui/www/views/Tickets/edit.html', {
        animation: 'lift',
        recordId: recordId
      });
    };

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
              myNavigator.popPage();
            });
        }
      });
    };
  }])
  .controller('TicketAddController', ['$scope', 'Ticket', '$rootScope',
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
            myNavigator.popPage({
              recordId: record.id
            });
          });
      };
    }
  ])
  .controller('TicketEditController', ['$scope', 'Ticket', '$rootScope',
    function($scope, Ticket, $rootScope, $state) {
      var page = myNavigator.getCurrentPage();
      var recordId = page.options.recordId;
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
            myNavigator.popPage({
              recordId: record.id
            });
          });
      };
    }
  ]);