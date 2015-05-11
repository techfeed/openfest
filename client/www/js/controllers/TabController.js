(function() {
  var app = angular.module('app');
  app.controller('IndexTabController', ['$scope', '$rootScope', '$state',
    function($scope, $rootScope, $state) {
      $state.go('Event.list');
    }
  ]);
  app.controller('AccountTabController', ['$scope', '$rootScope', '$state',
    function($scope, $rootScope, $state) {
      if ($rootScope.currentUser) {
        $state.go('FestUser.detail', { id: $rootScope.currentUser.id });
      } else {
        $state.go('login');
      }
    }
  ]);
})();
