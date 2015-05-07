angular
  .module('app')
  .factory('AuthService', ['FestUser', '$q', '$rootScope', function(FestUser, $q,
      $rootScope) {
    function login(credential) {
      return FestUser
        .login(credential)
        .$promise
        .then(function(response) {
          $rootScope.currentUser = {
            id: response.user.id,
            tokenId: response.id,
            email: credential.email
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

    function register(userData) {
      return FestUser
        .create(userData)
       .$promise;
    }

    return {
      login: login,
      logout: logout,
      register: register
    };
  }]);
