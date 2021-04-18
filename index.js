const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
// const bodyParser = require('body-parser');
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ofbyf.mongodb.net/medicineCorner?retryWrites=true&w=majority`;

const app = express()
app.use(express.json());
app.use(cors());
// app.use(bodyParser.json());

const port = 5055;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const medicineCollection = client.db("medicineCorner").collection("products");

    app.get('/all', (req, res) => {
        medicineCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })

    })

    app.get('/getOrder', (req, res) => {
        medicineCollection.find({ name: req.query.name })
            .toArray((err, documents) => {
                console.log(documents);
                console.log(err);
                res.send(documents);
            })
    })

    app.post('/addService', (req, res) => {
        const newService = req.body;
        medicineCollection.insertOne(newService)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })

    app.post('/addProduct', (req, res) => {
        const newProduct = req.body;
        medicineCollection.insertOne(newProduct)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })

    app.post('/addReview', (req, res) => {
        const newReview = req.body;
        medicineCollection.insertOne(newReview)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })

    app.post('/addOrder', (req, res) => {
        const newOrder = req.body;
        medicineCollection.insertOne(newOrder)
            .then(result => {
                console.log(result);
            })
    })


    // client.close();
    console.log('database connected')
});

app.get('/', (req, res) => {
    res.send('working properly')
})

app.listen(process.env.PORT || port)