const doQuery = require('./config/db');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const errorText = '처리중 문제가 발생하였습니다.'

app.use(express.json());
app.use(express.urlencoded( {extended : false } ));

app.listen(PORT, (req, res) => {
    console.log(`Server On : http://localhost:${PORT}/`);
});

app.get('/api', (req, res)=>{
    res.send({response : 'root test'});
});

app.post('/api/getUser', async (req, res)=>{
    const {rows, error} = await doQuery('getUser', req.body);
    
    res.send({
        data : rows,
        errMsg : error ? errorText : ''
    });
});


