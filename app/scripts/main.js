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
      Api.login(e.email, e.password, e.keepAlive)
    }
  }]);

appControllers.controller('RegisterCtrl', ['$scope', 'Api',
  function ($scope, Api) {
    $scope.submit = function(e) {
      Api.register(e.email, e.password, e.keepAlive)
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
          $scope.transactions.reverse();

          // Get chart data
          // I don't really like the way this is done
          var data = response.data.data;
          var dataset = [];
          var labels = [];
          data.map(function (item) {
            labels.push(item.date)
            dataset.push(item.sum)
          });
          $scope.lineChart = {}
          $scope.lineChart.data = {
            labels: labels,
            series: [
              {
                data: dataset
              }
            ]
          };
          $scope.lineChart.options = {
            axisX: {
              labelInterpolationFnc: function skipLabels(value, index) {
                return index % 5  === 0 ? value : null;
              }
            }
          }

          var dataset = [];
          data.map(function (item) {
            if(item.value < 0) {
              if(typeof(dataset[item.category]) === "undefined") {
                dataset[item.category] = +item.value;
              }
              else {
                dataset[item.category] = +dataset[item.category] + +item.value;
              }
            }
          });
          var serie = [];
          var labels = [];
          for(var key in dataset) {
            var value = dataset[key] *= -1;
            serie.push(value);
            labels.push(key);
          }
          $scope.pieChart = {};
          $scope.pieChart.data = {
            labels: labels,
            series: serie
          }
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
