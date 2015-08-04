var flyout = angular.module('flyout', []);

flyout.directive('flyout', [function () {
  return {
    restrict: 'E',
    templateUrl: 'views/flyout.html',
    scope: {
      menuItems: '=items'
    },
    controller: function($scope) {
      console.log($scope.menuItems)
      console.log("oi from directive")

      $scope.overlay = {
        open: false,
        toggle: function() {
          $scope.overlay.open = !$scope.overlay.open;
          console.log("toggle", $scope.overlay);
        }
      }
    }
  };
}])
