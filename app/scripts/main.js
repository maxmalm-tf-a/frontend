var app = angular.module('trifork', [
  'ngRoute',
  'ngCookies',
  'appControllers',
  'appBackend'
  ]);

var appControllers = angular.module('appControllers', []);

appControllers.controller('HomeCtrl', ['$scope', '$http', '$location', '$cookies',
  function ($scope, $http, $location, $cookies) {
    $scope.submit = function(e) {
      $http.get('http://localhost:1337/api/account', {
        params: {
          username: e.email,
          password: e.password
        }
      }).success(function(data, status, headers, config) {
        if(data) {
          $cookies.put('token', data);
          $location.path('/account');
        }
      });
    }

    $scope.orderProp = 'age';
  }]);

appControllers.controller('AccountCtrl', ['$scope', 'Api',
  function($scope, Api) {

    $scope.valid = false;
    Api.verifyToken().then(function() {
      $scope.valid = true;
    });

    /*
    // todo: make this into a factory
    $http.get('http://localhost:1337/api/verifytoken', {
      params: {
        token: $cookies.get('token')
      }
    }).error(function() {
      console.log("Incorrect token");
      $cookies.remove('token');
      $location.path('/');
    })*/
  }]);
