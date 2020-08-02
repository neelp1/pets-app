const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

var MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;
const username = process.env.MONGO_USERNAME
const password = process.env.MONGO_PASSWORD
// const dburl = 'mongodb://${username}:${password}@mongo:27017/pets'
// const dburl = 'mongodb://sammy:gsangl3pu49slnflsfan@pets-app-db:27017/pets'
const dburl = 'mongodb://mongo:27017'

console.log(process.env.HELLO)


MongoClient.connect(dburl, { useUnifiedTopology: true })
.then(function(client){
  console.log("connected to mongo!")

  const db = client.db('pets');
  const dogsCollection = db.collection('dogs')


    app.post('/api/pets/dog', (req, res) => {
      dogsCollection.insertOne(req.body)
        .then(result => {
          res.send(result)
        })
        .catch(error => console.error(error))
    })

    app.get('/api/pets/dogs', function (req, res) {
      // res.send(req.params['test'])
      dogsCollection.find().toArray()
        .then(results => {
          res.send(results)
        })
        .catch(error => console.error(error))
    })

    app.put('/api/pets/dog', (req, res) => {

      var dogId = new ObjectID(req.body._id)
      dogsCollection.findOneAndUpdate(
        // res.send(req.body)
        { _id: dogId},
        {
          $set: {
            Name: req.body.Name,
            Breed: req.body.Breed
          }
        },
        {
          upsert: true
        }
      )
      .then(result => {
        res.send(result)
      })
      .catch(error => console.error(error))
    })

    app.delete('/api/pets/dog', (req, res) => {
      dogsCollection.deleteOne(
        { Name: req.body.Name }
      )
      .then(result => {
        res.send(result)
      })
      .catch(error => console.error(error))

    })

})
.catch(function (err) {})


app.use(
  '/healthcheck',
  require('express-healthcheck')({
    healthy: function() {
      return { everything: 'is ok!' }
    },
  }),
)

app.get('/', (req, res) => res.send('Hello World!'))



// app.get('/api/pets/:species', function (req, res) {
//   res.send('localhost:3001/api/' + req.params['species'])
//
// })

app.listen(3001, () => console.log('Example app listening on port 3001!'))
//lookup nodemon
