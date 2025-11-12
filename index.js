const express = require("express");
const app = express();

app.use(express.json());

require('dotenv').config()

const { MongoClient, ObjectId } = require("mongodb");

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const hostname = process.env.MONGO_HOSTNAME;
const mongoport = process.env.MONGO_PORT;
const mongodatabase = process.env.MONGO_DB;

const dburl = `mongodb://${username}:${password}@${hostname}:${mongoport}`
//console.log(hostname);
//console.log(mongoport);
//console.log(dburl);

MongoClient.connect(dburl)
  .then(function (client) {
    console.log("connected to mongo!");

    const db = client.db(mongodatabase);
    const dogsCollection = db.collection("dogs");

    app.post("/api/pets/dog", (req, res) => {
      console.log(req.body);
      dogsCollection
        .insertOne(req.body)
        .then((result) => {
          res.status(201).json({
            success: true,
            insertedId: result.insertedId,
            acknowledged: result.acknowledged,
          });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send({ error: "Failed to create dog" });
        });
    });

    app.get("/api/pets/dogs", function (req, res) {
      dogsCollection
        .find()
        .toArray()
        .then((results) => {
          res.send(results);
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send({ error: "Failed to fetch dogs" });
        });
    });

    app.put("/api/pets/dog", (req, res) => {
      var dogId = new ObjectId(req.body._id);
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
        .catch((error) => {
          console.error(error);
          res.status(500).send({ error: "Failed to update dog" });
        });
    });

    app.delete("/api/pets/dog", (req, res) => {
      dogsCollection
        .deleteOne({ title: req.body.title })
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send({ error: "Failed to delete dog" });
        });
    });
  })
.catch((error) => console.log(error));

app.use(
  "/healthcheck",
  require("express-healthcheck")({
    healthy: function () {
      return { api: "running" };
    },
  })
);

app.get("/", (req, res) => res.send("Welcome to the Pets App!"));

app.listen(3001, () => console.log("Pets App listening on port 3001!"));
//TODO: nodemon
