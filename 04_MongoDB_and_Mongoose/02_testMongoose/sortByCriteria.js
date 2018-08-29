const mongoose = require('mongoose')

mongoose.Promise = global.Promise

let connection = 'mongodb://localhost:27017/mongooseDemoSchema2'

let catSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number }
})

let Cat = mongoose.model('Cat', catSchema)

mongoose.connect(connection, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(err)
    return
  }

  // find all by given criteria and update them with some new value
  Cat
    .find({})
    .limit(5) // the first 5
    .sort('name') // A-Z, or '-name' for Z-A, or '-name age' for (name: Z-A , then by age in accending order)
    .select('name') // this will return only the name property of the collection and the ids, and nothing else (!!save trafic) 
    .then(cats => {
      console.log(cats)
    })
    .catch(err => {
      let errors = err.errors
      for (let errKey in errors) {
        console.log(errors[errKey].message)
      }
    })
})
