var app = angular.module('userApp',['user', 'ngRoute']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/users', {
        templateUrl: 'views/user-list.html',
        controller: 'userController'
      }).
      when('/user/:userId', {
        templateUrl: 'views/user-detail.html',
        controller: 'userDetailController'
      }).
      otherwise({
        redirectTo: '/users'
      });
  }]);

app.filter('substring', function() {
  return function(input, length) {
    return input.length < length ? input : input.substring(0, length) + '...';
  }
});

