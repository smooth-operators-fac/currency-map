const http = require('http');
const handler = require('../server/handler.js');
var loadfile = require('../server/loadfile');

const server = http.createServer(handler);

var port = process.env.PORT || 4000;

server.listen(port);
