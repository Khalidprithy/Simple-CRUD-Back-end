const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, MongoRuntimeError } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());




const uri = "mongodb+srv://cruduser:naXJR4nVj*Wc6Ra@cluster0.ta851.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const productCollection = client.db("simpleCrud").collection("products");

    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir)


app.get('/', (req, res) => {
    res.send("Running CRUD server")
});

app.listen(port, () => {
    console.log("Server is running")
})


// cruduser
// naXJR4nVj*Wc6Ra