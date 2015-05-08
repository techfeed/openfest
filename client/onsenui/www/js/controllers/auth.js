angular
  .module('app')
  .controller('LoginController', ['$scope', 'User', function($scope, User) {
    $scope.login = function() {
      myNavigator.pushPage(
        '/onsenui/www/models-index.html', { animation : 'lift' } );
    };
    $scope.signup = function() {
      myNavigator.pushPage(
        '/onsenui/www/signup.html', { animation : 'lift' } );
    };
  }])
  .controller('SignupController', ['$scope', 'User', function($scope, User) {
    $scope.signup = function() {
      myNavigator.pushPage(
        '/onsenui/www/models-index.html', { animation : 'lift' } );
    };
  }]);
