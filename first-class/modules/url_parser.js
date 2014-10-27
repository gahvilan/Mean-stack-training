//url_parser

var url = require('url');

exports.getQueryParam = function (req, name) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    return query[name];
}


