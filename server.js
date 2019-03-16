const http = require('http');
const port = 5000;

http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain');
    res.end('Hello World');
}).listen(port);

