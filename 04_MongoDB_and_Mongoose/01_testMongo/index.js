const mongodb = require('mongodb')
let connection = 'mongodb://localhost:27017'

mongodb.MongoClient.connect(connection, (err, client) => {
  if (err) {
    console.log(err)
    return
  }
  let db = client.db('mongodbTestDemo')

  let cats = db.collection('cats')

  cats.insertOne({name: 'Pesho'}, (err, result) => {
    if (err) {
      console.log(err)
      return
    }
    console.log(result)
  })
})
