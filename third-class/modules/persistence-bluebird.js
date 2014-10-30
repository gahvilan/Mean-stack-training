var Promise = require('bluebird');
var fs = require('fs');
Promise.promisifyAll(fs);

var filename = 'users.json'

/**
 * Loads a user by id.
 */
var load = function (id) {
    return loadUsers().then(function (users) {
        return users[id];
    });
}

var save = function (user, callback) {
    return loadUsers().then(function (users) {
        users[user['id']] = user;
        return fs.writeFileAsync(filename, JSON.stringify(users));
    });
}

var loadUsers = function () {
    return fs.readFileAsync(filename).then(function (data) {
        if (!data || data == "") {
            data = "{}";
        }
        return JSON.parse(data);
    });
}

var listUsers = function () {
    return loadUsers().then(function (users) {
        var result = []
        for (key in users) {
            result.push(users[key]);
        }
        return result;
    });
}

//Initial flag creation
fs.openAsync(filename, "a").then(fs.close, console.log.bind(null, 'Error creating file'));

exports.save = save;
exports.load = load;
exports.loadAll = listUsers;
