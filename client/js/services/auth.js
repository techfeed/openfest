angular
  .module('app')
  .factory('AuthService', ['FestUser', '$q', '$rootScope', function(FestUser, $q,
      $rootScope) {
    function login(email, password) {
      return FestUser
        .login({email: email, password: password})
        .$promise
        .then(function(response) {
          $rootScope.currentUser = {
            id: response.user.id,
            tokenId: response.id,
            email: email
          };
        });
    }

    function logout() {
      return FestUser
       .logout()
       .$promise
       .then(function() {
         $rootScope.currentUser = null;
       });
    }

    function register(email) {
      return FestUser
        .create({
         email: email
       })
       .$promise;
    }

    return {
      login: login,
      logout: logout,
      register: register
    };
  }]);
