(function() {
  var app = angular.module('app');
  app.controller('IndexTabController', ['$scope', '$rootScope', '$state',
    function($scope, $rootScope, $state) {
      $state.go('index');
    }
  ]);
  app.controller('AccountTabController', ['$scope', '$rootScope', '$state',
    function($scope, $rootScope, $state) {
      $state.go('login');
    }
  ]);
})();
