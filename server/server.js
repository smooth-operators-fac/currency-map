const map = require('../server/map.js');
const http = require('http');
const handler = require('../server/handler.js');

const server = http.createServer(handler);

const port = process.env.PORT || 4001;

map.make(() => {
  server.listen(port);
});
