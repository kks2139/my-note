const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded( {extended : false } ));

app.listen(PORT, (req, res) => {
    console.log(`Server On : http://localhost:${PORT}/`);
});

app.get('/api', (req, res)=>{
    res.send({response : 'root test'});
});


