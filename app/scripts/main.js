angular.module('trifork', [
  'ngRoute',
  'ngCookies',
  'appControllers',
  'appBackend',
  'appRouter'
]);

var appControllers = angular.module('appControllers', []);

appControllers.controller('LoginCtrl', ['$scope', 'Api',
  function ($scope, Api) {
    $scope.submit = function(e) {
      Api.login(e.email, e.password)
    }
  }]);

appControllers.controller('HomeCtrl', ['$scope', 'Api',
  function ($scope, Api) {

  }]);

appControllers.controller('AccountCtrl', ['$scope', 'Api',
  function ($scope, Api) {

    $scope.valid = false;
    $scope.sum = 0;

    Api.verifyToken().then(function() {
      $scope.valid = true;

      Api.getTransactions().then(function(response) {
        console.log(response)
        if(response.data.data.length > 0) {
          $scope.sum = response.data.data[0].sum;
          $scope.transactions = response.data.data;
        }
      })
    });

    $scope.logout = function() {
      console.log("Logout")
      Api.logout();
    }

    $scope.seed = function() {
      Api.seedDatabase();
    }
  }]);
