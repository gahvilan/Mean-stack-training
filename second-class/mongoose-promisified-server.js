var express = require('express');
var persistence = require('./modules/persistence-mongoose-promisified');

var app = express();
var router = express.Router();
var bodyParser = require('body-parser');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


router.get('/users', function (req, res) {
  persistence.loadAll().then(function (users) {
      res.send(users);
    }, function (err) {
      res.status(500).send({error: "Error loading users: " + err});
    })
});

router.post('/user', function (req, res) {
  console.log("Saving user " + JSON.stringify(req.body));
  persistence.save(req.body).then(function () {
      res.send({msg: "User saved successfully"});
    }, function (err) {
      if (err) {
        res.status(500).send({error: "Error saving user: " + err});
      }
    })
});

router.get('/user/:id', function (req, res) {
  persistence.load(req.params.id).then(function (user) {
      if (user == null) {
        res.status(404).send({error: "User with id " + req.params.id + " not found"});
        return;
      }
      res.send(user);
    }).then(null, function (err) {
        res.status(500).send({error: "Error loading user: " + err});
    });
});

router.put('/user/:id', function (req, res) {
  var userId = req.params.id;
  persistence.update(userId, req.body).then(function (user) {
    if (user == null) {
      res.status(404).send({error: "User with id " + userId + " not found"});
      return;
    }
    res.send({msg: "User updated successfully"});
  }).then(null, function (err) {
      res.status(500).send({error: "Error updating user " + userId});
  })
});

var port = process.env.PORT || 8080;
console.log('Starting server on port', port);

app.use('/', router);
app.listen(port);

