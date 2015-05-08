angular
  .module('app')
  .controller('LoginController', function($scope, AuthService) {

    $scope.user = {
      email: '',
      password: ''
    };

    $scope.login = function() {
      AuthService.login($scope.user)
        .then(function() {
          myNavigator.pushPage(
            '/onsenui/www/models-index.html', { animation : 'lift' } );
        }).catch(function(resp) {
          var msg = resp.message ? resp.message :
            resp.data ? resp.data.error.message : 'not connected.';
          alert('error: ' + msg);
        });
    };

    $scope.signup = function() {
      myNavigator.pushPage(
        '/onsenui/www/views/FestUsers/signup.html', {
          animation : 'lift'
        });
    };
  })

  .controller('SignupController', function($scope, AuthService) {

    $scope.user = {
      username: '',
      screenname: '',
      email: '',
      password: ''
    };

    $scope.signup = function() {
      AuthService.register($scope.user)
        .then(function(){
          myNavigator.pushPage(
            '/onsenui/www/models-index.html', { animation : 'lift' } );
        }).catch(function(resp) {
          var msg = resp.message ? resp.message :
                  resp.data ? resp.data.error.message : 'not connected.';
          alert('error: ' + msg);
        })
    };
  });
