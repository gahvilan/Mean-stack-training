var express = require('express');
var persistence = require('./modules/persistence-bluebird');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


router.get('/', function (req, res) {
  persistence.loadAll().then(function (users) {
    res.send(users);
  }).catch(function (err) {
      res.status(500).send({error: "Error loading users: " + err});
  })
});

router.post('/', function (req, res) {
  console.log("Saving user " + JSON.stringify(req.body));
  persistence.save(req.body).then(function () {
      res.send({msg: "User saved successfully"});
    }, function (err) {
        res.status(500).send({error: "Error saving user: " + err});
    })
});

router.get('/:id', function (req, res) {
  persistence.load(req.params.id).then(function (user) {
      if (user == null) {
        res.status(404).send({error: "User with id " + req.params.id + " not found"})
      }
      res.send(user);
    }, function (err) {
        res.status(500).send({error: "Error loading user: " + err});
    })
});

var port = process.env.PORT || 3000;
console.log('Starting server on port', port);

app.use('/user', router);

app.use(express.static(__dirname + '/public/'));
app.listen(port);

