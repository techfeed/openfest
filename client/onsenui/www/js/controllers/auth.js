angular
  .module('app')
  .controller('LoginController', ['$scope', 'User', function($scope, User) {
    $scope.login = function() {
      .pushPage(
        '/onsenui/www/models-index.html', {
          animation: 'lift'
        });
    };
    $scope.signup = function() {
      .pushPage(
        '/onsenui/www/signup.html', {
          animation: 'lift'
        });
    };
  }])
  .controller('SignupController', ['$scope', 'User', function($scope, User) {
    $scope.signup = function() {
      .pushPage(
        '/onsenui/www/models-index.html', {
          animation: 'lift'
        });
    };
  }]);