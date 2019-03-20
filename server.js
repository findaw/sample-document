const express = require('express');
//const bodyParser = require('body-parser');
const app = express();

//app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

app.get('/', (req, res)=> res.send('hello world'));

/*example */
app.post('/signin', (req, res) => {
    const { username, password } = req.body;
    // 클라이언트로부터 전송된 페이로드를 그대로 response한다.
    res.send({ username, password });
});

app.listen(5000, ()=> console.log('listening on port 3000'));
