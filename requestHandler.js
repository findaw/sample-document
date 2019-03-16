const formidable = require("formidable");
const fs = require("fs");


function start(response) {
  console.log("Request handler 'start' was called.");
  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="file" name="upload" />'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request) {
  console.log("Request handler 'upload' was called.");
  
  const form = new formidable.IncomingForm();
  console.log("about to parse");
  form.uploadDir = "D:/Users/tmp";  //업로드될 임시 디렉토리 정함(cross-device error 방지)
  form.parse(request, (err, fields, files)=>{
    console.log("parsing done");
    fs.renameSync(files.upload.path, "upload/test.png"); 
    response.writeHead(200, {"Content-Type" : "text/html"});
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end();
  });
}
function show(response){
  console.log("Request handler 'show' was called");
  fs.readFile("./upload/test.png", "binary", (error, file)=>{
    if(error){
      response.writeHead(500, {"Content-type" : "text/plain"});
      response.write(`${error}\n`);
      response.end();
    }else{
      response.writeHead(200, {"Content-type" : "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}
exports.start = start;
exports.upload = upload;
exports.show = show;