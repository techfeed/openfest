angular
  .module('app')
  .controller('AllEventsController', ['$scope', 'Event', function($scope,
      Event) {
    $scope.events = Event.find();
  }])
  .controller('AddEventController', ['$scope', 'Event', 'Ticket', '$rootScope',
      '$state', function($scope, Event, Ticket, $rootScope, $state) {
    $scope.action = 'Add';
    $scope.event = {
      title: 'テストタイトル',
      subtitle: 'テストサブタイトル',
      startDate: '2015-05-10',
      startTime: '19:00',
      endDate: '2015-05-10',
      endTime: '21:00'
    };
    $scope.submitForm = function() {
      var startDate = $scope.event.startDate;
      var startTime = $scope.event.startTime;
      var endDate = $scope.event.endDate;
      var endTime = $scope.event.endTime;

      var startAt = new Date(startDate + 'T' + startTime);
      var endAt = new Date(endDate + 'T' + endTime);

      Event
        .create({
          title: $scope.event.title,
          subtitle: $scope.event.subtitle,
          startAt: startAt,
          endAt: endAt,
          place: $scope.event.place,
          published: !!$scope.event.published,
          ownerId: $rootScope.currentUser.id
        })
        .$promise
        .then(function(event) {
          $state.go('all-events');
        });
    };
  }]);
  /*
  .controller('DeleteReviewController', ['$scope', 'Review', '$state',
      '$stateParams', function($scope, Review, $state, $stateParams) {
    Review
      .deleteById({ id: $stateParams.id })
      .$promise
      .then(function() {
        $state.go('my-reviews');
      });
  }])
  .controller('EditReviewController', ['$scope', '$q', 'CoffeeShop', 'Review',
      '$stateParams', '$state', function($scope, $q, CoffeeShop, Review,
      $stateParams, $state) {
    $scope.action = 'Edit';
    $scope.coffeeShops = [];
    $scope.selectedShop;
    $scope.review = {};
    $scope.isDisabled = true;

    $q
      .all([
        CoffeeShop.find().$promise,
        Review.findById({ id: $stateParams.id }).$promise
      ])
      .then(function(data) {
        var coffeeShops = $scope.coffeeShops = data[0];
        $scope.review = data[1];
        $scope.selectedShop;

        var selectedShopIndex = coffeeShops
          .map(function(coffeeShop) {
            return coffeeShop.id;
          })
          .indexOf($scope.review.coffeeShopId);
        $scope.selectedShop = coffeeShops[selectedShopIndex];
      });

    $scope.submitForm = function() {
      $scope.review.coffeeShopId = $scope.selectedShop.id;
      $scope.review
        .$save()
        .then(function(review) {
          $state.go('all-reviews');
        });
    };
  }])
  .controller('MyReviewsController', ['$scope', 'Review', '$rootScope',
      function($scope, Review, $rootScope) {
    $scope.reviews = Review.find({
      filter: {
        where: {
          publisherId: $rootScope.currentUser.id
        },
        include: [
          'coffeeShop',
          'reviewer'
        ]
      }
    });
  }]);
  */
