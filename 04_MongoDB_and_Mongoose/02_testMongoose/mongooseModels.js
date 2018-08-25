const mongoose = require('mongoose')

mongoose.Promise = global.Promise

let connection = 'mongodb://localhost:27017/mongooseDemoSchema'

// Defining schema way
let catSchema = new mongoose.Schema({
  name: {type: String, required: true},
  age: {type: Number, default: 0},
  birthday: {type: Date}
})
let Cat = mongoose.model('Cat', catSchema)

// Defining schema 2 way
// let Cat = mongoose.model('Cat', {
//   name: {type: String, required: true},
//   age: {type: Number, default: 0}
// })

mongoose.connect(connection, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(err)
    return
  }

  let cat = new Cat({
    // name prop is omitted to show the error handling
    age: 3,
    birthday: new Date()
  })

  // first start will save the cat
  cat
    .save()
    .then(cat => {
      console.log(cat)
    })
    .catch(err => {
      let errors = err.errors
      for (let errKey in errors) {
        console.log(errors[errKey].message)
      }
    })
})
