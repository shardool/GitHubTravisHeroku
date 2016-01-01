'use strict';
var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {
        'content-type': 'text/plain'
    });
    res.write('shar trek is an awesome show');
    res.end();
}).listen(process.env.PORT || 44000);