(function() {
  var app = angular.module('app');
  app.controller('SearchTabController', ['$scope', '$rootScope', '$state',
    function($scope, $rootScope, $state) {
      $state.go('Event.list');
    }
  ]);
  app.controller('ManageTabController', ['$scope', '$rootScope', '$state',
    function($scope, $rootScope, $state) {
      $state.go('Event.manage');
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
