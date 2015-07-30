angular.module('trifork', [
  'ngRoute',
  'ngCookies',
  'appControllers',
  'appBackend',
  'appRouter'
  ]);

var appControllers = angular.module('appControllers', []);

appControllers.controller('HomeCtrl', ['$scope', 'Api',
  function ($scope, Api) {
    $scope.submit = function(e) {
      Api.login(e.email, e.password)
    }
  }]);

appControllers.controller('AccountCtrl', ['$scope', 'Api',
  function ($scope, Api) {

    $scope.valid = false;
    Api.verifyToken().then(function() {
      $scope.valid = true;

      Api.getTransactions().then(function(response) {
        $scope.transactions = response.data.data;
      })
    });
  }]);
