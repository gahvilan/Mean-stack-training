angular.module('user.services.resource').factory('userServiceResource', ['$resource', function ($resource) {
    
    var User = $resource('/user', {userId:'@id'});

    var list = function () {
        return User.query().$promise;
    }

    var persist = function (user) {
        return new User(user).$save();
    }

    return {
        list: list,
        persist: persist
    };

}]);