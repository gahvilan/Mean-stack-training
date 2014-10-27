var express = require('express');

var app = express();

var port = process.env.PORT || 8080;
console.log('Starting server on port', port);
var callback = function (req, res) {
  console.log("Received request");
  res.send('Hello world!');
}

app.get('/', callback);
app.listen(port);
