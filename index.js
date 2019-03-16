const server = require('./server');
const router = require('./router');
const handler  = require('./requestHandler');

var handle = {}
handle["/"] = handler.start;
handle["/start"] = handler.start;
handle["/upload"] = handler.upload;

server.start(router.route, handle)