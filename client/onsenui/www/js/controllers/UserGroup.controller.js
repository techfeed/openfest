angular
  .module('app')
  .controller('UserGroupListController', ['$scope', 'UserGroup', function($scope,
    UserGroup) {
    $scope.records = UserGroup.find();
    $scope.showDetail = function(id) {
      myNavigator.pushPage('/onsenui/www/views/UserGroups/detail.html', { animation : 'slide', recordId: id } );
    };
  }])
  .controller('UserGroupDetailController', ['$scope', 'UserGroup', function($scope,
    UserGroup) {
    var page = myNavigator.getCurrentPage();
    var recordId = page.options.recordId;
    $scope.record = UserGroup.findById({id: recordId});

    $scope.edit = function() {
      myNavigator.pushPage('/onsenui/www/views/UserGroups/edit.html', { animation : 'lift', recordId: recordId } );
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
          UserGroup            .removeById({id: recordId})
            .$promise
            .then(function() {
              myNavigator.popPage();
            });
        }
      });
    };
  }])
  .controller('UserGroupAddController', ['$scope', 'UserGroup', '$rootScope',
    function($scope, UserGroup, $rootScope, $state) {
    $scope.save = function() {
              var _name = $scope.record.name;
                      var _profile = $scope.record.profile;
                      var _iconUrl = $scope.record.iconUrl;
              
      var requestParams = {};
              requestParams['name'] = _name;
              requestParams['profile'] = _profile;
              requestParams['iconUrl'] = _iconUrl;
      
      UserGroup        .create(requestParams)
        .$promise
        .then(function(record) {
          myNavigator.popPage({ recordId: record.id });
        });
    };
  }])
  .controller('UserGroupEditController', ['$scope', 'UserGroup', '$rootScope',
    function($scope, UserGroup, $rootScope, $state) {
    var page = myNavigator.getCurrentPage();
    var recordId = page.options.recordId;
    $scope.record = UserGroup.findById({id: recordId});

    $scope.save = function() {
              var _name = $scope.record.name;
                      var _profile = $scope.record.profile;
                      var _iconUrl = $scope.record.iconUrl;
              
      var requestParams = {
        id: recordId
      };
              requestParams['name'] = _name;
              requestParams['profile'] = _profile;
              requestParams['iconUrl'] = _iconUrl;
      
      UserGroup        .update({where: {id: recordId}}, requestParams)
        .$promise
        .then(function(record) {
          myNavigator.popPage({ recordId: record.id });
        });
    };
  }]);
