const express = require("express");
const app = express();

app.use(express.json());

//TODO: run if not prod / not kubernetes
//require('dotenv').config()

var MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const hostname = process.env.MONGO_HOSTNAME;
const mongoport = process.env.MONGO_PORT;
const mongodatabase = process.env.MONGO_DB;



const dburl = `mongodb://${username}:${password}@${hostname}:${mongoport}`
console.log(hostname);
console.log(mongoport);
console.log(dburl);

MongoClient.connect(dburl, { useUnifiedTopology: true })
  .then(function (client) {
    console.log("connected to mongo!");

    const db = client.db(mongodatabase);
    const dogsCollection = db.collection("dogs");

    app.post("/api/pets/dog", (req, res) => {
      console.log(req.body);
      dogsCollection
        .insertOne(req.body)
        .then((result) => {
          res.send(result);
        })
        .catch((error) => console.error(error));
    });

    app.get("/api/pets/dogs", function (req, res) {
      dogsCollection
        .find()
        .toArray()
        .then((results) => {
          res.send(results);
        })
        .catch((error) => console.error(error));
    });

    app.put("/api/pets/dog", (req, res) => {
      var dogId = new ObjectID(req.body._id);
      dogsCollection
        .findOneAndUpdate(
          { _id: dogId },
          {
            $set: {
              title: req.body.title,
              address: req.body.address,
            },
          },
          {
            upsert: true,
          }
        )
        .then((result) => {
          res.send(result);
        })
        .catch((error) => console.error(error));
    });

    app.delete("/api/pets/dog", (req, res) => {
      dogsCollection
        .deleteOne({ title: req.body.title })
        .then((result) => {
          res.send(result);
        })
        .catch((error) => console.error(error));
    });
  })
.catch((error) => console.log(error));

app.use(
  "/healthcheck",
  require("express-healthcheck")({
    healthy: function () {
      return { everything: "is ok!" };
    },
  })
);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(3001, () => console.log("Example app listening on port 3001!"));
//TODO: nodemon
