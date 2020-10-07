const express = require('express');

const bodyParser = require ('body-parser');
const cors = require('cors');
const port = 5000
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mu8kf.mongodb.net/socialWork?retryWrites=true&w=majority`;
const app = express();
app.use(cors());
app.use(bodyParser.json());





const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
client.connect(err => {
  const registerCollection = client.db("socialWork").collection("register");
  
app.post('/addRegister', (req,res)=>{
    const newRegistration = req.body;
    registerCollection.insertOne(newRegistration)
    .then(result => {
        res.send(result.insertedCount> 0)
    })
    console.log(newRegistration);
})

});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || port)