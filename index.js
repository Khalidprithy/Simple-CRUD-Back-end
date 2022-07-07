const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, MongoRuntimeError, ObjectId } = require('mongodb');
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

        app.get('/products', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })

        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const product = await productCollection.findOne(query);
            res.send(product);
        })

        app.post('/products', async (req, res) => {
            const newProduct = req.body;
            const result = await productCollection.insertOne(newProduct);
            res.send(result)
        })

        app.delete('/products/:id', async (req, res) => {
            const id = req.params;
            const query = { _id: ObjectId(id) };
            const result = await productCollection.deleteOne(query);
            res.send(result)
        });

        app.put('/products/:id', async (req, res) => {
            const id = req.params.id;
            const updatedProduct = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    name: updatedProduct.name,
                    brand: updatedProduct.brand,
                    price: updatedProduct.price,
                    quantity: updatedProduct.quantity,
                    picture: updatedProduct.picture,
                    // Or you can write updatedProduct
                }
            };
            const result = await productCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })
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
