const http = require('http'),
    url = require('url');
const port = 5000;
exports.start = (route, handle) =>{
    http.createServer((req, res) => {

       const pathname = url.parse(req.url).pathname;
       route(handle, pathname, res, req);

    }).listen(port);

    console.log("server has started..");
};

