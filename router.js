exports.route = (handle, pathname, response, postData) => {
    if(typeof handle[pathname] === 'function'){
        return handle[pathname](response, postData);
    }else{
        console.log("No Request handler found for" + pathname);
        response.writeHead(404, {'Content-Type' : 'text/plain'});
        response.write("404 Not Found");
        response.end();
    }
};