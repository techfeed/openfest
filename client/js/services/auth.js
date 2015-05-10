angular
  .module('app')
  .factory('AuthService', ['FestUser', '$q', '$rootScope', 'LoopBackAuth',
    function(FestUser, $q, $rootScope, LoopBackAuth) {

    function login(credential) {
      return FestUser
        .login({ rememberMe: true }, credential)
        .$promise
        .then(function(response) {
          $rootScope.currentUser = {
            id: response.user.id,
            tokenId: response.id,
            email: response.user.email,
            temporary: !!response.user.temporaryPassword
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

    function remember() {
      return FestUser
        .getCurrent()
        .$promise
        .then(function(user) {
          $rootScope.currentUser = {
            id: user.id,
            tokenId: LoopBackAuth.accessTokenId,
            email: user.email,
            temporary: !!user.temporaryPassword
          };
        });
    }

    return {
      login: login,
      logout: logout,
      register: register,
      remember: remember
    };
  }]);
