const doQuery = require('./config/db');
const express = require('express');
const helper = require('./helper');

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

app.post('/api/login', async (req, res)=>{
    req.body.pw = helper.encrypt(req.body.pw); 
    const {rows, error} = await doQuery('getUser', req.body);
    res.send({
        data : rows,
        errMsg : error ? errorText : ''
    });
});

app.post('/api/join', async (req, res)=>{
    req.body.pw = helper.encrypt(req.body.pw); 
    const {rows, error} = await doQuery('getUser', req.body);
    if(rows.length > 0){
        res.send({
            data : rows,
            errMsg : 'existing user'
        });
    }else{
        const {obj, error2} = await doQuery('insertUser', req.body);
        res.send({
            data : obj,
            errMsg : error2 ? errorText : ''
        });
    }
});

app.post('/api/getNoteList', async (req, res)=>{
    const {rows, error} = await doQuery('getNoteList', req.body);
    res.send({
        data : rows,
        errMsg : error ? errorText : ''
    });
});

app.post('/api/insertNote', async (req, res)=>{
    req.body.note_id = helper.uuid('NT');
    const {rows, error} = await doQuery('insertNote', req.body);
    res.send({
        data : rows,
        errMsg : error ? errorText : ''
    });
});

app.post('/api/deleteNote', async (req, res)=>{
    const {rows, error} = await doQuery('deleteNote', req.body);
    res.send({
        data : rows,
        errMsg : error ? errorText : ''
    });
});

app.post('/api/getTextContent', async (req, res)=>{
    const {rows, error} = await doQuery('getTextContent', req.body);
    res.send({
        data : rows,
        errMsg : error ? errorText : ''
    });
});

app.post('/api/saveTextContent', async (req, res)=>{
    const {rows, error} = await doQuery('saveTextContent', req.body);
    res.send({
        data : rows,
        errMsg : error ? errorText : ''
    });
});

app.post('/api/updateNoteName', async (req, res)=>{
    const {rows, error} = await doQuery('updateNoteName', req.body);
    res.send({
        data : rows,
        errMsg : error ? errorText : ''
    });
});

app.post('/api/updateNoteOrder', async (req, res)=>{
    try{
        await helper.doBatch(()=>{
            let notes = req.body.list;
            for(let i=0; i<notes.length; i++){
                doQuery('updateNoteOrder', notes[i]);
            }
        });
        res.send({
            data : [],
            errMsg : ''
        });
    }catch(ex){
        console.log(ex);
        res.send({
            data : [],
            errMsg : ex
        });
    }
});



