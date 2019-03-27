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

app.get('/api/default_subject', (req, res)=> {
    conn.query("SELECT DT.doctype_id, DT.name AS doctype, DS.name, DS.isNeed FROM default_subject AS DS JOIN doctype AS DT ON DS.doctype_id = DT.doctype_id ORDER BY doctype_id ASC;"
    , (err, rows, fields)=>{
        res.send(rows);
    });
});
app.get('/api/default_category', (req, res)=> {
    conn.query("SELECT CT.name AS typename, DC.name FROM default_category AS DC JOIN category_type AS CT ON DC.category_type_id = CT.category_type_id ORDER BY CT.category_type_id ASC;"
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
