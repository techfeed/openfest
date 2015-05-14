angular
  .module('app')
  .factory('AuthService', function(FestUser, $q, $rootScope, LoopBackAuth, $state) {

    /**
     * Set user to $rootScope
     * @param accessToken
     */
    function setCurrentUser(user) {
      var currentUser = angular.extend({}, user);
      delete currentUser.$promise;
      delete currentUser.$resolved;
      $rootScope.currentUser = currentUser;
      return currentUser;
    }

    /**
     * Save Auth data to Storage
     * @param accessToken
     * @param userid
     * @param user
     */
    function saveAuth(accessToken, userid, user) {
      LoopBackAuth.setUser(accessToken, userid, user);
      LoopBackAuth.rememberMe = user ? !!user.rememberMe : false;
      LoopBackAuth.save();
    }

    /**
     * Clear Auth data from Storage
     */
    function clearAuth() {
      $rootScope.currentUser = null;
      LoopBackAuth.clearUser();
      LoopBackAuth.clearStorage();
    }

    /**
     * Login
     * @param credential
     * @returns {Promise}
     */
    function login(credential) {
      clearAuth();
      return FestUser
        .login(credential)
        .$promise
        .then(function(accessToken) {
          return setCurrentUser(accessToken.user);
        });
    }

    function socialLogin(provider) {
      clearAuth();
      location.href = '/auth/' + provider;
    }

    function socialLink(provider) {
      location.href = '/link/' + provider;
    }

    /**
     * Logout
     * @returns {Promise}
     */
    function logout() {
      return FestUser
       .logout()
       .$promise
       .finally(clearAuth);
    }

    /**
     * Register new user
     * @param user
     * @returns {Promise}
     */
    function register(user) {
      return FestUser
        .create(user)
        .$promise
        .then(function(accessToken) {
          saveAuth(accessToken.id, accessToken.user.id, accessToken.user);
          return setCurrentUser(accessToken.user);
        });
    }

    /**
     * remember user from cookie or storage
     * @returns {*}
     */
    function remember() {
      if (LoopBackAuth.accessTokenId && LoopBackAuth.currentUserId) {
        setCurrentUser({id: LoopBackAuth.currentUserId});
      }

      return FestUser
        .getCurrent()
        .$promise
        .then(function(user) {
          var userJson = user.toJSON();
          saveAuth(LoopBackAuth.accessTokenId, user.id, userJson);
          return setCurrentUser(userJson);
        })
        .catch(function(){
          clearAuth();
          $state.go('login');
        });
    }

    $rootScope.setCurrentUser = setCurrentUser;
    return {
      login: login,
      socialLogin: socialLogin,
      socialLink: socialLink,
      logout: logout,
      register: register,
      remember: remember
    };
  });
