const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('brimstone university server')
})
app.listen(port, () => {
    console.log('brimstone server running');
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zjrcntk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        console.log('database connected');
        const facultyCollection = client.db('brimstone').collection('faculty')
        app.get('/faculty', async (req, res) => {
            const result = await facultyCollection.find({}).toArray()
            res.send(result)
        })

        const achivementCollection = client.db('brimstone').collection('achivement')
        app.get('/achivement', async (req, res) => {
            const result = await achivementCollection.find({}).toArray()
            res.send(result)
        })






    } catch (error) {
        console.log(error);
    } finally {

    }
}
run().catch(console.dir)
