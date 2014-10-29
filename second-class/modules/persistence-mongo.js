var mongo = require('mongodb');
var MongoClient = mongo.MongoClient
var BSON = mongo.BSONPure;


/**
 * Loads a user by id.
 */
var url = "mongodb://localhost:27017/sample";
var load = function (id, callback) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            callback(err, null);
            return;
        }
        console.log("Connected correctly to server");
        var users = db.collection('users');
        users.findOne({"_id": new BSON.ObjectID(id)}, function(err, user) {
            callback(err, user);
            db.close();
        });
    });
}

var save = function (user, callback) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            callback(err, null);
            return;
        }
        console.log("Connected correctly to server");
        var users = db.collection('users');
        users.insert(user, function(err) {
            callback(err);
            db.close();
        });
    });
}

var loadUsers = function (callback) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            callback(err, null);
            return;
        }
        console.log("Connected correctly to server");
        var users = db.collection('users');
        users.find({}).toArray(function(err, users) {
            callback(err, users);
            db.close();
        });
    });
}


exports.save = save;
exports.load = load;
exports.loadAll = loadUsers;
