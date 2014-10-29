var express = require('express');
var persistence = require('./modules/persistence-mongoose');

var app = express();
var router = express.Router();
var bodyParser = require('body-parser');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


router.get('/users', function (req, res) {
  persistence.loadAll(function (err, users) {
    if (err) {
        res.status(500).send({error: "Error loading users: " + err});
        return;
    }
    res.send(users);
  })
});

router.post('/user', function (req, res) {
  console.log("Saving user " + JSON.stringify(req.body));
  persistence.save(req.body, function (err) {
    if (err) {
        res.status(500).send({error: "Error saving user: " + err});
        return;
    }
    res.send({msg: "User saved successfully"});
  })
});

router.get('/user/:id', function (req, res) {
  persistence.load(req.params.id, function (err, user) {
    if (err) {
        res.status(500).send({error: "Error loading user: " + err});
        return;
    }
    if (user == null) {
        res.status(404).send({error: "User with id " + req.params.id + " not found"});
        return;
    }
    res.send(user);
  })
});

router.put('/user/:id', function (req, res) {
  var userId = req.params.id;
  persistence.update(userId, req.body, function (err, user) {
    if (err) {
      res.status(500).send({error: "Error updating user " + userId});
      return;
    }
    if (user == null) {
      res.status(404).send({error: "User with id " + userId + " not found"});
      return;
    }
    res.send({msg: "User updated successfully"});
  });
});

var port = process.env.PORT || 8080;
console.log('Starting server on port', port);

app.use('/', router);
app.listen(port);

