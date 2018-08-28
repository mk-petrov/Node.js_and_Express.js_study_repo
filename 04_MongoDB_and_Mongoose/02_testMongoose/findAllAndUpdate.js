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
    .update(
      {name: 'Ivan'},
      {$set: {name: 'Pesho'}},
      {multi: true}
    )
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
