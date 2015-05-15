(function() {
  var app = angular.module('app');
  app.controller('UserEventsController', function($scope, Event, FestUser, $state, $stateParams) {


    $scope.state = $stateParams.state;
    $scope.isAttend = $stateParams.state === 'attend';
    $scope.isOwner = $stateParams.state === 'owner';

    $scope.condition = 'open';

    function isOpen() {
      return $scope.condition === 'open';
    }

    function endFilter(event) {
      var now = Date.now();
      var endDate = Date.parse(event.endAt);
      return isOpen() ? endDate > now : endDate <= now;
    }

    function getAttendList() {
      FestUser.tickets({
        id: $scope.currentUser.id,
        filter: {
          include: 'event'
        }
      })
        .$promise
        .then(function(tickets) {
          $scope.records =
            tickets
              .filter(function(ticket) {
                return !ticket.cancelledAt;
              })
              .map(function(ticket) {
                return ticket.event;
              })
              .filter(endFilter);
        });
    }

    function getOwnList() {
      FestUser
        .events({id: $scope.currentUser.id})
        .$promise
        .then(function(events) {
          $scope.records = events.filter(endFilter);
        });
    }

    $scope.getList = $scope.isAttend ? getAttendList : getOwnList;

    $scope.getList();
  });

})();
