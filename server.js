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

app.get('/api/document_category', (req, res)=> {
    conn.query("SELECT C.category, T.categorytype FROM document_category AS C JOIN document_categorytype as T ON C.categorytype_id =T.categorytype_id ORDER BY categorytype ASC;"
    , (err, rows, fields)=>{
        res.send(rows);
    });
});
app.get('/api/document_subject', (req, res)=> {
    conn.query("SELECT subject FROM document_subject ORDER BY subject ASC;"
    , (err, rows, fields)=>{
        res.send(rows);
    });
});
app.post('/api/document', (req, res)=> {
    let sql = "INSERT INTO document_list VALUES(null, ?,now(), 0)";
    let title = req.body.title;
    let params = [title];
    conn.query(sql, params
    , (err, rows, fields)=>{
        res.send(rows);
    });
});

app.listen(5000, ()=> console.log('listening on port 3000'));
