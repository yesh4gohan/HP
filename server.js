const cors = require('cors');
var express = require('express')
const fs =require('fs');
    app = express();
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(cors());
var contacts = fs.readFileSync('contacts2.json');
//var num=89;
app.get('/',  function(req, res) {
    contacts = fs.readFileSync('contacts2.json');
    res.send(contacts);
})
app.get('/random_users',  function(req, res) {
    contacts = fs.readFileSync('res.json');
    res.send(contacts);
})
app.get('/register',  function(req, res) {
    user_credentials = fs.readFileSync('user_credentials.json');
    res.send(user_credentials);
})
app.post('/putData',function(req, res) {
    //console.log(req.body.new)
    res.setHeader('Content-Type', 'application/json');
    console.log(req.body.newData);
    fs.writeFile('contacts2.json', JSON.stringify(req.body.newData), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
    res.send("file edited");
}); 
})

app.post('/putuserdata',function(req, res) {
    //console.log(req.body.new)
    res.setHeader('Content-Type', 'application/json');
    console.log(req.body.newData);
    fs.writeFile('user_credentials.json', JSON.stringify(req.body.newData), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
    res.send("You have successfully registed");
}); 
})

app.listen(3000,console.log("server opened at port 3000"));

JSON.stringify()
