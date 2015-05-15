(function() {
  var app = angular.module('app');
  app.controller('SearchTabController', ['$scope', '$rootScope', '$state',
    function($scope, $rootScope, $state) {
      $state.go('Event.list');
    }
  ]);
  app.controller('ManageTabController', ['$scope', '$rootScope', '$state',
    function($scope, $rootScope, $state) {
      $state.go('Event.manage');
    }
  ]);
  app.controller('AccountTabController', ['$scope', '$rootScope', '$state', 'TabbarView',
    function($scope, $rootScope, $state, TabbarView) {

      $rootScope.log = function() {
        console.log(arguments);
      };

      if ($rootScope.currentUser) {
        $state.go('user-profile');
      } else {
        $state.go('login');
      }
    }
  ]);
  app.run(function(TabbarView) {
    // dirty huck for OnsenUI Bug
    TabbarView.prototype.isReactive = function(index) {
      var selectedTabItem = this._tabItems[index];

      return (typeof selectedTabItem.noReload !== 'undefined' || selectedTabItem.isPersistent()) &&
        index === this.getActiveTabIndex();
    };

    TabbarView.prototype.setActiveTab = function(index, options) {
      options = options || {};

      var previousTabItem = this._tabItems[this.getActiveTabIndex()],
        selectedTabItem = this._tabItems[index],
        previousTabIndex = this.getActiveTabIndex(),
        selectedTabIndex = index;

      if(this.isReactive(index)) {
        this.emit('reactive', {
          index: index,
          tabItem: selectedTabItem,
        });
        return false;
      }

      var needLoad = selectedTabItem.page && !options.keepPage;

      if (!selectedTabItem) {
        return false;
      }

      var canceled = false;
      this.emit('prechange', {
        index: index,
        tabItem: selectedTabItem,
        cancel: function() {
          canceled = true;
        }
      });

      if (canceled) {
        selectedTabItem.setInactive();
        if (previousTabItem) {
          previousTabItem.setActive();
        }
        return false;
      }

      selectedTabItem.setActive();

      if (needLoad) {
        var removeElement = true;

        if (previousTabItem && previousTabItem.isPersistent()) {
          removeElement = false;
          previousTabItem._pageElement = this._currentPageElement;
        }

        var params = {
          callback: function() {
            this.emit('postchange', {index: index, tabItem: selectedTabItem});
          }.bind(this),
          previousTabIndex: previousTabIndex,
          selectedTabIndex: selectedTabIndex,
          _removeElement: removeElement
        };

        if (options.animation) {
          params.animation = options.animation;
        }

        if (selectedTabItem.isPersistent() && selectedTabItem._pageElement) {
          this._loadPersistentPageDOM(selectedTabItem._pageElement, params);
        }
        else {
          this._loadPage(selectedTabItem.page, params);
        }
      }

      for (var i = 0; i < this._tabItems.length; i++) {
        if (this._tabItems[i] != selectedTabItem) {
          this._tabItems[i].setInactive();
        } else {
          if (!needLoad) {
            this.emit('postchange', {index: index, tabItem: selectedTabItem});
          }
        }
      }

      return true;
    };

  });
})();
