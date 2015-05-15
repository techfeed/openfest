angular.module('app')
  .factory('HistoryService', function($state) {

    var stack = [];
    var isBack;

    function pushState(obj) {
      if (!isBack && obj.state.name) {
        stack.push(obj);
      }
      isBack = false;
    }

    function back() {
      if (isEmpty()) {
        return;
      }
      var page = stack.pop();
      isBack = true;
      $state.go(page.state, page.params);
      prePage = page;
      return page;
    }

    function getPageRef(page) {
      var ref = page.state.name;
      if (!_.isEmpty(page.params)) {
        ref = ref + '(' + JSON.stringify(page.params) + ')';
      }
      return ref;
    }

    function reset() {
      stack = [];
    }

    function isEmpty() {
      return stack.length === 0;
    }

    return {
      pushState: pushState,
      back: back,
      reset: reset,
      isEmpty: isEmpty
    }
  });
