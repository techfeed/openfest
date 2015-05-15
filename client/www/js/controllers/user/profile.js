(function(){
  var app = angular.module('app');
  app.controller('UserProfileController', function($scope, FestUser, $stateParams) {

    var configPopover;
    ons.createPopover('profile-config-popover.html', {parentScope: $scope})
      .then(function(popover){
        configPopover = popover;
      });

    $scope.openConfigMenu = function ($event) {
      configPopover.show($event.target);
    };

    $scope.closeConfigMenu = function() {
      configPopover.hide();
    };

    if (_.isEmpty($stateParams) || $scope.currentUser.id === $stateParams.id) {
      $scope.user = $scope.currentUser;
      $scope.isOwner = true;
    } else {
      $scope.user = FestUser.findById({
        id: $stateParams.id
      });
    }

  });

})();
