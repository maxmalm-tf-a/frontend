angular.module('trifork', [
  'ngRoute',
  'ngCookies',
  'appControllers',
  'appBackend',
  'appRouter',
  'navigation',
  'angular-chartist'
]);

var appControllers = angular.module('appControllers', []);

appControllers.controller('LoginCtrl', ['$scope', 'Api',
  function ($scope, Api) {
    $scope.submit = function(e) {
      Api.login(e.email, e.password)
    }
  }]);

appControllers.controller('HeaderCtrl', ['$scope',
  function ($scope) {
    $scope.items = [
      {href: '/', name: "Start"},
      {href: '/account', name: "My account"},
      {href: '/about', name: "About us"},
    ]
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
        if(response.data.data.length > 0) {
          $scope.sum = response.data.data[0].sum;
          $scope.transactions = response.data.data;

          // Get chart data
          // I don't really like the way this is done
          var data = response.data.data.reverse();
          var dataset = [];
          var labels = [];
          data.map(function (item) {
            labels.push(item.date)
            dataset.push(item.sum)
          });
          $scope.lineChart = {
            labels: labels,
            series: [
              {
                data: dataset
              }
            ]
          };
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
