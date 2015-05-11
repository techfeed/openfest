angular
  .module('app')
  .factory('AuthService', function(FestUser, $q, $rootScope, LoopBackAuth, $state) {

    // If it set true, store access_token to localStorage. If false, use SessionStorage
    var rememberMe = true;

    function setAccessToken(accessToken) {
      $rootScope.currentUser = {
        id: accessToken.user.id,
        tokenId: accessToken.id,
        email: accessToken.user.email,
        emailVerified: !!accessToken.user.emailVerified,
        username: accessToken.user.username
      };
    }

    function login(credential) {
      return FestUser
        .login({rememberMe: true}, credential)
        .$promise
        .then(function(accessToken) {
          setAccessToken(accessToken);
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

    function register(user) {
      return FestUser
        .create(user)
        .$promise
        .then(function(accessToken) {
          LoopBackAuth.setUser(accessToken.id, accessToken.user.id, accessToken.user);
          LoopBackAuth.rememberMe = rememberMe;
          LoopBackAuth.save();

          setAccessToken(accessToken);
        });
    }

    function remember() {
      return FestUser
        .getCurrent()
        .$promise
        .then(function(user) {
          var currentUser = {
            id: user.id,
            tokenId: LoopBackAuth.accessTokenId,
            email: user.email,
            emailVerified: user.emailVerified,
            username: user.username
          };
          $rootScope.currentUser = currentUser;
          return currentUser;
        })
        .catch(function(resp) {
          LoopBackAuth.clearUser();
          LoopBackAuth.clearStorage();
          return null;
        });
    }

    $rootScope.$on('$stateChangeStart', function(toState, next) {
      if (next.name === 'logout') {
        console.log('logout');
        logout()
          .then(function(){
            $state.go('login');
          });
      }
    });

    return {
      login: login,
      logout: logout,
      register: register,
      remember: remember
    };
  });
