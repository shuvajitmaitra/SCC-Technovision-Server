const express = require("express");
const cors = require("cors");
require('dotenv').config()
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wyy6auz.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {



    const todoCollection = client.db("SCCTechnovisionDB").collection("todo");
    const progressCollection = client.db("SCCTechnovisionDB").collection("progress");
    
    const doneCollection = client.db("SCCTechnovisionDB").collection("done");


    app.post("/todo", async (req, res) => {
        const todo = req.body
        const result = await todoCollection.insertOne(todo)
        res.send(result)
      })
      
    app.get("/todo/:email", async (req, res) => {
        const email = req.params.email
        const query = {email:email}
        console.log(email);
        const result = await todoCollection.find().toArray()
        console.log(result);
        res.send(result)
      })
    app.get("/progress/:email", async (req, res) => {
        const email = req.params.email
        const query = {email:email}
        console.log(email);
        const result = await progressCollection.find().toArray()
        console.log(result);
        res.send(result)
      })

    app.get("/done/:email", async (req, res) => {
        const email = req.params.email
        const query = {email:email}
        console.log(email);
        const result = await doneCollection.find().toArray()
        console.log(result);
        res.send(result)
      })

    app.delete('/todo/:id', async(req, res)=>{
      const id = req.params.id
      const query = {_id: new ObjectId(id)}
      const result = await todoCollection.deleteOne(query)
      res.send(result)
    })

        app.post('/done', async(req, res) =>{
      const item = req.body
      const result = await doneCollection.insertOne(item)
      res.send(result)

    })
 


  
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
  res.send("Crud is running...");
});

app.listen(port, () => {
  console.log(`Simple Crud is Running on port ${port}`);
});