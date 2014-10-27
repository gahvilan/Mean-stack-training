var http = require('http');
var parser = require('./modules/url_parser');


var port = process.env.PORT || 8080;

console.log('Starting server on port', port);

var callback = function (req, res) {
  console.log("Received request");
  res.writeHead(200, "Content-type: text/plain");
  res.write('Hello ' + parser.getQueryParam(req, 'name') + '\n');
  res.end();
}

http.createServer(callback).listen(port);

