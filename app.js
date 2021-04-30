require('dotenv').config();
const express = require('express');
const path = require('path');
const https = require('https');

app = express();
app.use(express.json());
app.use(require('cors')());

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname + '/public/index.html'))
});

app.get('/index.js', (req, res)=>{
    res.sendFile(path.join(__dirname + "/public/index.js"))
});

app.get('/style.css', function(req, res) {
    res.sendFile(__dirname + "/public/style.css");
  });
  
app.get('/api/meaning/:query', async (req, res) => {
    
    let data = "";
    request = {
          host: "api.dictionaryapi.dev",
          path: `/api/v2/entries/en_US/${req.params.query}`
    }

    https.request(request, (response)=>{
    
        let str = "";
        response.on('data', function (chunk) {
            str += chunk;
        });
        
        response.on('end', async() =>{
            data = str
            res.json(JSON.parse(data)[0]);
        });
        
    }).end();


});


app.listen(process.env.PORT, ()=> {
    console.log(`Server is listening on localhost:${process.env.PORT}`)
    
});