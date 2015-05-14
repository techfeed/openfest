(function(){
  var app = angular.module('app');
  app.controller('UserProfileController', function($rootScope, $scope, AuthService, $state) {

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

  });

})();
