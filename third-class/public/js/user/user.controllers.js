angular.module('user.controllers').controller('userController', ['$scope', 'userService', function($scope, userService) {
    $scope.user = {};
    $scope.users = [];

    $scope.save = function () {
        $scope.user.id = $scope.users.length + 1;
        userService.persist($scope.user).then(function (data) {
            $scope.list();
            alert('User saved successfully');
        }, function (err) {
            alert('Error saving user: ' + err);
        });
        $scope.user = {};
    }

    $scope.list = function () {
        userService.list().then(function (users) {
            $scope.users = users;
        }, function (err) {
            alert('Error loading users');
        });
    }

    $scope.list();
}]);

angular.module('user.controllers').controller('userDetailController',
    ['$scope', '$routeParams', 'userService', function($scope, $routeParams, userService) {
    $scope.user = {};

    $scope.load = function () {
        var userId = $routeParams.userId;
        userService.load(userId).then(function (user) {
            $scope.user = user;
        }, function (err) {
            alert('Error loading user');
        });
    }

    $scope.load();
}]);