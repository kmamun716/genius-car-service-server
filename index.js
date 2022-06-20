const express = require("express");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const port = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());

const url = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(url);
async function run() {
  try {
    await client.connect();
    console.log("database connected");
    const serviceCollection = client.db("genius-car-services").collection("services");

    app.get("/services", async(req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });

    app.get("/service/:id", async(req, res) => {
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const service = await serviceCollection.findOne(query);
        res.send(service);
    });

      app.post('/service', async(req,res)=>{
        const data = req.body;
        const result = await serviceCollection.insertOne(data);
        res.send(result);
      })

  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/all", (req, res) => {
  serviceCollection.find({}).toArray((err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`app is running at port ${port}`);
});
