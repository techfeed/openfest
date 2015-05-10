angular
  .module('app')
  .controller('LoginController', function($scope, AuthService, $state) {

    $scope.user = {
      email: '',
      password: ''
    };

    $scope.login = function() {
      AuthService.login($scope.user)
        .then(function() {
          $state.go('index');
        }).catch(function(resp) {
          var msg = resp.message ? resp.message :
            resp.data ? resp.data.error.message : 'not connected.';
          alert('error: ' + msg);
        });
    };

    $scope.signup = function() {
      $state.go('signup');
    };
  })

  .controller('SignUpController', function($scope, AuthService) {

    $scope.user = {
      username: '',
      screenname: '',
      email: '',
      password: ''
    };

    $scope.signup = function() {
      AuthService.register($scope.user)
        .then(function(){
          $state.go('index');
        }).catch(function(resp) {
          var msg = resp.message ? resp.message :
                  resp.data ? resp.data.error.message : 'not connected.';
          alert('error: ' + msg);
        })
    };
  });
