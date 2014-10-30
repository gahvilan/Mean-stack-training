angular.module('user.services').factory('userService', ['$http', '$q', function ($http, $q) {
    
    var url = 'http://localhost:3000/user';

    var list = function () {
        var deferred = $q.defer();
        $http.get(url).success(function (data, status) {
            deferred.resolve(data);
        }).error(function (err) {
            deferred.reject('Error listing users');
        })
        return deferred.promise;
    }

    var persist = function (user) {
        var deferred = $q.defer();
        $http.post(url, user).success(function (data, status) {
            deferred.resolve(data);
        }).error(function (err) {
            deferred.reject('Error persisting user');
        });
        return deferred.promise;
    }

    var load = function (id) {
        var deferred = $q.defer();
        $http.get(url + '/' + id).success(function (data, status) {
            deferred.resolve(data);
        }).error(function (err) {
            deferred.reject('Error persisting user');
        });
        return deferred.promise;
    }

    return {
        list: list,
        persist: persist,
        load: load
    };

}]);