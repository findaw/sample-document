const express = require('express');
const app = express();
const mysql = require('mysql2/promise');
const fs = require('fs');
const stringjson = fs.readFileSync('./database.json');

app.use(express.json());

const conf = JSON.parse(stringjson);
const pool = mysql.createPool({
    host : conf.host,
    user : conf.user,
    password : conf.password,
    database : conf.database,
    connectionLimit:20,
    waitForConnections:false,
});

app.get('/api/default-doctype-category', async(req, res)=>{
    const conn = await pool.getConnection();
    try{
        let [rows] = await conn.query("SELECT * FROM doctype;");
        const doctype = rows;
        [rows] = await conn.query("SELECT CT.name AS typename, DC.name FROM default_category AS DC JOIN category_type AS CT ON DC.category_type_id = CT.category_type_id ORDER BY CT.category_type_id ASC;");
        const category = rows;
        res.send({doctype, category});
    }catch(err){
        console.log(err);
        res.status(400).send("error");
    }finally{
        conn.release();
    }
});
app.get('/api/document-list',async(req, res)=>{
    const conn = await pool.getConnection();
    try{
        let [rows] = await conn.query("SELECT document_id,title,doctype_id AS doctype,created_date AS date FROM document_list WHERE isDeleted = 0;");
        const lists = rows;
        for(let i = 0; i < lists.length; i++){
            [rows] = await conn.query("SELECT name FROM document_tag WHERE document_id = ?;",lists[i].document_id);
            lists[i].category = rows.map(obj=>{return obj.name});
        }
        res.send({lists});
    }catch(err){
        console.log(err);
        conn.rollback();
        res.status(400).send("error");
    }finally{
        conn.release();
    }
});
app.get('/api/default-subject-category',  async (req, res)=> {
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try{
        let [rows] = await conn.query("SELECT DT.doctype_id, DT.name AS doctype, DS.name, DS.isNeed FROM default_subject AS DS JOIN doctype AS DT ON DS.doctype_id = DT.doctype_id ORDER BY doctype_id ASC;");
        const subjarr = rows;
        [rows] = await conn.query("SELECT CT.name AS typename, DC.name FROM default_category AS DC JOIN category_type AS CT ON DC.category_type_id = CT.category_type_id ORDER BY CT.category_type_id ASC;");
        const catearr = rows;
        await conn.commit();
        res.send({subjarr, catearr});
    }catch(err){
        conn.rollback();
        console.log(err);
    }finally{
        conn.release();
    }
});

app.post('/api/document', async (req, res)=> {
    console.log(req.body);
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    let {title, doctype_id, content, tag} = req.body;
    const timestamp = new Date();
    console.log(timestamp)
    try{
        await conn.query("INSERT INTO document_list VALUES(null, ?, ?,?, 0)",[title,doctype_id,timestamp]);
        let [rows] = await conn.query("SELECT document_id FROM document_list ORDER BY document_id DESC LIMIT 1;");
        const {document_id} = rows[0];

        tag.forEach(async(data)=>{
            await conn.query("INSERT INTO document_tag VALUES(?,?)",[document_id,data]);
        });
        
        Object.keys(content).forEach(async(subject)=>{
            if(content[subject].trim() !== "")
                await conn.query("INSERT INTO document_content VALUES(?,?,?,?)",[document_id,subject,content[subject], timestamp]);
        });

        await conn.commit();
        res.status(200).send("Success");
    }catch(err){
        console.log(err);
        await conn.rollback();
        res.status(400).send("Error");
    }finally{
        conn.release();
    }

});

app.listen(5000, ()=> console.log('listening on port 3000'));
