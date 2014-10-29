

var fs = require('fs');

var filename = 'users.json'

/**
 * Loads a user by id.
 */
var load = function (id, callback) {
    loadUsers(function (err, users) {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, users[id]);
    });
}

var save = function (user, callback) {
    loadUsers(function (err, users) {
        if (err) {
            callback(err, null);
            return;
        }
        users[user['id']] = user;
        fs.writeFile(filename, JSON.stringify(users), function(err) {
            callback(err);
        });
    });
}

var loadUsers = function (callback) {
    fs.readFile(filename, function(err, data) {
        if (err) {
            callback(err, null);
            return;
        }
        if (!data || data == "") {
            data = "{}";
        }
        var users = JSON.parse(data);
        callback(null, users);
    });
}

//Initial flag creation
fs.open(filename, "a", function(err, fd) {
  if (err) {
    console.log("Error creating users file");
    return;
  }
  fs.close(fd, function(){});
});

exports.save = save;
exports.load = load;
exports.loadAll = loadUsers;
