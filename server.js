const fs = require('fs');
const express = require('express');
const app = express();
const stringjson = fs.readFileSync('./database.json');
const conf = JSON.parse(stringjson);
const mysql = require('mysql');
const conn = mysql.createConnection({
    host : conf.host,
    user : conf.user,
    password : conf.password,
    port : conf.port,
    database : conf.database
});

conn.connect();
app.use(express.json());

app.get('/api/document_write', (req, res)=> {
    conn.query("SELECT C.category, T.categorytype FROM document_category AS C JOIN document_categorytype as T ON C.categorytype_id =T.categorytype_id"
    , (err, rows, fields)=>{
        console.log("에러메시지 :" + err);
        console.log(rows);
        console.log(fields);
        res.send(rows);
    });
});


app.listen(5000, ()=> console.log('listening on port 3000'));
