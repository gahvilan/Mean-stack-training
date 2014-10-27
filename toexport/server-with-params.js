var http = require('http');
var url = require('url');


var port = process.env.PORT || 8080;

console.log('Starting server on port', port);

var callback = function (req, res) {
  console.log("Received request");
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  res.writeHead(200, "Content-type: text/plain");
  res.write('Hello ' + query.name + '\n');
  res.end();
}

http.createServer(callback).listen(port);

