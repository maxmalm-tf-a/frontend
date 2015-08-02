var router = angular.module('appRouter', []);

router.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    //$locationProvider.html5Mode(true);

    $routeProvider.
      when('/', {
        templateUrl: '/views/home.html',
        controller: 'HomeCtrl'
      }).
      when('/account', {
        templateUrl: '/views/account.html',
        controller: 'AccountCtrl'
      }).
      when('/login', {
        templateUrl: '/views/login.html',
        controller: 'LoginCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
