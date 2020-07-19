const express = require('express')
const app = express()

var MongoClient = require('mongodb').MongoClient
const username = process.env.MONGO_USERNAME
const password = process.env.MONGO_PASSWORD
// const dburl = 'mongodb://${username}:${password}@mongo:27017/pets'
// const dburl = 'mongodb://mongo/pets'
// const dburl = 'mongodb://sammy:gsangl3pu49slnflsfan@pets-app-db:27017/pets'
const dburl = 'mongodb://mongo:27017'

console.log(process.env.HELLO)


MongoClient.connect(dburl, (err, client) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('Connected to Database')

})
.then(client => {
  const db = client.db('pets');
  const dogsCollection = db.collection('dogs')

  app.post('/api/pets/dog', (req, res) => {
    dogsCollection.insertOne(req.body)
      .then(result => {
        res.send(result)
      })
      .catch(error => console(error))
  })

  app.get('/api/pets/dogs', function (req, res) {
    // res.send(req.params['test'])
    dogsCollection.find().toArray()
      .then(results => {
        res.send(results)
      })

  })

  app.get('/api/pet/:test', function (req, res) {
    // res.send(req.params['test'])

  })
})
.catch(console.error)

app.use(
  '/healthcheck',
  require('express-healthcheck')({
    healthy: function() {
      return { everything: 'is ok!' }
    },
  }),
)

app.get('/', (req, res) => res.send('Hello World!'))



app.get('/api/pets/:species', function (req, res) {
  res.send('localhost:3001/api/' + req.params['species'])

})

app.listen(3001, () => console.log('Example app listening on port 3001!'))
//lookup nodemon
