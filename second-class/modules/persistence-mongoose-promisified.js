var mongoose = require('mongoose');
var url = "mongodb://localhost:27017/sample";

mongoose.connect(url);

var userSchema = mongoose.Schema({
    name: String
});

var User = mongoose.model('User', userSchema);

var load = function (id) {
    return User.findById(id).exec();
}

var save = function (user) {
    var u = new User(user);
    return u.save().exec();
}

var loadUsers = function () {
    return User.find().exec();
}

var updateUser = function(id, user, callback) {
    User.findById(id).exec().then(function (u) {
        u.name = user.name;
        return u.save().exec();
    });
}

exports.save = save;
exports.load = load;
exports.loadAll = loadUsers;
exports.update = updateUser;
