angular
  .module('app')
  .controller('UserListController', ['$scope', 'User', function($scope,
    User) {
    $scope.records = User.find();
    $scope.showDetail = function(id) {
      myNavigator.pushPage('/onsenui/www/views/users/detail.html', {
        animation: 'slide',
        recordId: id
      });
    };
  }])
  .controller('UserDetailController', ['$scope', 'User', function($scope,
    User) {
    var page = myNavigator.getCurrentPage();
    var recordId = page.options.recordId;
    $scope.record = User.findById({
      id: recordId
    });

    $scope.edit = function() {
      myNavigator.pushPage('/onsenui/www/views/users/edit.html', {
        animation: 'lift',
        recordId: recordId
      });
    };

    $scope.remove = function() {
      ons.notification.confirm({
        message: 'Are you sure?',
        title: 'Alert',
        buttonLabels: ['Yes', 'No'],
        primaryButtonIndex: 1,
        cancelable: true,
        callback: function(index) {
          if (index !== 0) {
            return;
          }
          User.removeById({
              id: recordId
            })
            .$promise
            .then(function() {
              myNavigator.popPage();
            });
        }
      });
    };
  }])
  .controller('UserAddController', ['$scope', 'User', '$rootScope',
    function($scope, User, $rootScope, $state) {
      $scope.save = function() {
        var _realm = $scope.record.realm;
        var _username = $scope.record.username;
        var _password = $scope.record.password;
        var _credentials = $scope.record.credentials;
        var _challenges = $scope.record.challenges;
        var _email = $scope.record.email;
        var _emailVerified = $scope.record.emailVerified;
        var _verificationToken = $scope.record.verificationToken;
        var _status = $scope.record.status;
        var _created = $scope.record.created;
        var _lastUpdated = $scope.record.lastUpdated;

        var requestParams = {};
        requestParams['realm'] = _realm;
        requestParams['username'] = _username;
        requestParams['password'] = _password;
        requestParams['credentials'] = _credentials;
        requestParams['challenges'] = _challenges;
        requestParams['email'] = _email;
        requestParams['emailVerified'] = _emailVerified;
        requestParams['verificationToken'] = _verificationToken;
        requestParams['status'] = _status;
        requestParams['created'] = _created;
        requestParams['lastUpdated'] = _lastUpdated;

        User.create(requestParams)
          .$promise
          .then(function(record) {
            myNavigator.popPage({
              recordId: record.id
            });
          });
      };
    }
  ])
  .controller('UserEditController', ['$scope', 'User', '$rootScope',
    function($scope, User, $rootScope, $state) {
      var page = myNavigator.getCurrentPage();
      var recordId = page.options.recordId;
      $scope.record = User.findById({
        id: recordId
      });

      $scope.save = function() {
        var _realm = $scope.record.realm;
        var _username = $scope.record.username;
        var _password = $scope.record.password;
        var _credentials = $scope.record.credentials;
        var _challenges = $scope.record.challenges;
        var _email = $scope.record.email;
        var _emailVerified = $scope.record.emailVerified;
        var _verificationToken = $scope.record.verificationToken;
        var _status = $scope.record.status;
        var _created = $scope.record.created;
        var _lastUpdated = $scope.record.lastUpdated;

        var requestParams = {
          id: recordId
        };
        requestParams['realm'] = _realm;
        requestParams['username'] = _username;
        requestParams['password'] = _password;
        requestParams['credentials'] = _credentials;
        requestParams['challenges'] = _challenges;
        requestParams['email'] = _email;
        requestParams['emailVerified'] = _emailVerified;
        requestParams['verificationToken'] = _verificationToken;
        requestParams['status'] = _status;
        requestParams['created'] = _created;
        requestParams['lastUpdated'] = _lastUpdated;

        User.update({
            where: {
              id: recordId
            }
          }, requestParams)
          .$promise
          .then(function(record) {
            myNavigator.popPage({
              recordId: record.id
            });
          });
      };
    }
  ]);