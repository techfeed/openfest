angular
  .module('app')
  .controller('MessageController', function($scope, $rootScope) {

    $rootScope.$on('msg', function(event, msg) {
      $rootScope.messageType = msg.messageType;
      $rootScope.message = msg.message;
    });

    $scope.close = function($event) {
      $event.preventDefault();
      $scope.$emit('msg', {
        message: null,
        type: ''
      });
    };
  }
);
