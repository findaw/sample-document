const http = require('http');
const url = require('url');
const port = 5000;

exports.start = (route, handle) =>{
    http.createServer((req, res) => {
        let postData = "";
        const pathname = url.parse(req.url).pathname;
        //const query = url.parse(req.url, true).query;
        req.setEncoding("utf8");
       
        req.on("data", postDataChunk => {
            postData += postDataChunk;
            console.log(`Received POST data chunk ${postDataChunk}.`);
        });
        req.on("end", ()=>{
            route(handle, pathname, res, postData);    
        });

    }).listen(port);

    console.log("server has started..");
};

