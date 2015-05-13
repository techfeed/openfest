(function(){
  var app = angular.module('app');
  app.controller('FestUserSignUpController', function($scope, AuthService, $state) {

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
          $scope.$emit('', msg);
          alert('error: ' + msg);
        })
    };
  });

})();
