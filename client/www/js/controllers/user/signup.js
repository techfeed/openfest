(function(){
  var app = angular.module('app');
  app.controller('UserSignUpController', function($scope, AuthService, $state) {

    $scope.user = {
      username: '',
      displayName: '',
      email: '',
      password: ''
    };

    $scope.signup = function() {
      AuthService.register($scope.user)
        .then(function(){
          $state.go('user-profile');
        }).catch(function(resp) {
          var msg = resp.message ? resp.message :
                  resp.data ? resp.data.error.message : 'not connected.';
          $scope.$emit('error', msg);
        })
    };
  });

})();
