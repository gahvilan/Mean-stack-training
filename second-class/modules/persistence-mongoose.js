var mongoose = require('mongoose');
var url = "mongodb://localhost:27017/sample";

mongoose.connect(url);

var userSchema = mongoose.Schema({
    name: String
});

var User = mongoose.model('User', userSchema);

var load = function (id, callback) {
    User.findById(id, callback);
}

var save = function (user, callback) {
    var u = new User(user);
    u.save(callback);
}

var loadUsers = function (callback) {
    User.find(callback);
}

var updateUser = function(id, user, callback) {
    User.findById(id, function (err, u) {
        if (err) {
            callback(err, null);
            return;
        }
        u.name = user.name;
        u.save(callback);
    });
}

exports.save = save;
exports.load = load;
exports.loadAll = loadUsers;
exports.update = updateUser;
