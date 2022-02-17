var express = require('express');
var app = express();
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var dotenv = require('dotenv');


dotenv.config();
// var mongoLocalUrl = process.env.MongoLocalUrl;
var mongoLiveUrl = "mongodb+srv://aps_database:arunps94@cluster0.iq5mg.mongodb.net/foodapp?retryWrites=true&w=majority"
var cors = require("cors")
var port = process.env.PORT || 2124;
const bodyParser = require('body-parser');
//save the database connection
var db 

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req, res) => {res.send("Hii from Express")})


// get food api
app.get('/food',(req,res) => {
    db.collection('foodapi').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})



//connecting with mongodb
MongoClient.connect(mongoLiveUrl,(err,client)=>{
    if (err) console.log("Error while connecting")
    db = client.db('foodapp')
    app.listen(port,()=>{
        console.log(`listening on port ${port}`);
    }) 
})

