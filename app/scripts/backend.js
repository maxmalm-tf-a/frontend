var backend = angular.module('appBackend', []);

backend.service('Api', ['$http', '$cookies', '$location', '$route',
  function ($http, $cookies, $location, $route) {

    var base = 'http://localhost:1337/api/';

    this.login = function(email, password) {
      $http.get(base + 'account', {
        params: {
          username: email,
          password: password
        }
      }).success(function(data, status, headers, config) {
        if(data) {
          $cookies.put('token', data.data);
          $location.path('/account');
        }
      });
    }

    this.register = function(email, password) {
      self = this;
      $http.get(base + 'register', {
        params: {
          username: email,
          password: password
        }
      }).success(function(data, status, headers, config) {
        if(data) {
          $cookies.put('token', data.data);
          $location.path('/account');
          self.seedDatabase();
        }
      });
    }

    this.logout = function () {
      $cookies.remove('token');
      $location.path('/');
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
        $location.path('/login');
      })
    }

    this.getTransactions = function () {
      return $http.get(base + 'transactions', {
        params: {
          token: $cookies.get('token')
        }
      })
      .error(function() {
        console.log("error");
      })
    }

    this.storeTransaction = function(text, value, date) {
      return $http.get(base + 'transactions', {
        params: {
          token: $cookies.get('token')
        }
      })
      .error(function() {
        console.log("error");
      })
    }

    this.seedDatabase = function() {
      console.log($cookies.get('token'))
      return $http.post(base + 'populate', {
        params: {
          token: $cookies.get('token')
        }
      })
      .success(function() {
        $route.reload();
      })
      .error(function() {
        console.log("error");
      })
    }
  }])
