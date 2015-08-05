var navigation = angular.module('navigation', []);

navigation.directive('menuFlyout', [function () {
  return {
    restrict: 'E',
    templateUrl: 'directives/flyout.html',
    controller: function($scope, MenuItems) {
      $scope.menuItems = MenuItems;
      $scope.overlay = {
        open: false,
        toggle: function() {
          $scope.overlay.open = !$scope.overlay.open;
        }
      }
    }
  };
}])

navigation.factory('MenuItems', function() {
  var items = [
    {href: '/', name: "Start"},
    {href: '/account', name: "My account"},
    {href: '/about', name: "About us"},
  ];

  return items;
});
