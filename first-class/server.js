var http = require('http');

var port = process.env.PORT || 8080;

console.log('Starting server on port', port);

var callback = function (req, res) {
  console.log("Received request");
  res.writeHead(200, "Content-type: text/plain");
  res.write('Hello world!');
  res.end();
}

http.createServer(callback).listen(port);

