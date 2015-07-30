var backend = angular.module('appBackend', []);

backend.service('Api', ['$http', '$cookies', '$location',
  function ($http, $cookies, $location) {

    var base = 'http://localhost:1337/api/';

    this.login = function(email, password) {
      $http.get(base 'account', {
        params: {
          username: email,
          password: password
        }
      }).success(function(data, status, headers, config) {
        if(data) {
          console.log(data)
          $cookies.put('token', data.data);
          $location.path('/account');
        }
      });
    }

    this.verifyToken = function () {
      return $http.get(base + 'verifytoken', {
        params: {
          token: $cookies.get('token')
        }
      })
      .error(function() {
        console.log("Incorrect token");
        $cookies.remove('token');
        $location.path('/');
      })
    }

    this.getTransactions = function () {
      return $http.get(base + 'transactions', {
        params: {
          token: $cookies.get('token')
        }
      })
      .success(function() {

      })
      .error(function() {
        console.log("error");
      })
    }

    this.storeTransaction = function(text, value, date) {
      return $http.post(base + 'transactions', {
        params: {
          token: $cookies.get('token')
        }
      })
      .success(function() {

      })
      .error(function() {
        console.log("error");
      })
    }
  }])
