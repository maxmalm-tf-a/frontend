var backend = angular.module('appBackend', []);

backend.service('Api', ['$http', '$cookies', '$location' ,
  function ($http, $cookies, $location) {
    this.verifyToken = function () {
      return $http.get('http://localhost:1337/api/verifytoken', {
        params: {
          token: $cookies.get('token')
        }
      })
      .success(function() {
        return true;
      })
      .error(function() {
        console.log("Incorrect token");
        $cookies.remove('token');
        $location.path('/');
      })
    }
  }])
