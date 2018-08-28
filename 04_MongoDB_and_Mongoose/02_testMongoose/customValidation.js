const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.ObjectId

mongoose.Promise = global.Promise

let connection = 'mongodb://localhost:27017/mongooseDemoSchema2'

let catSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  owner: { type: ObjectId } // save the cats owner by Id
})

// Custom Validation
catSchema.path('age').validate(value => {
  return value >= 0 && value < 20
}, 'Age must be a number between 0 and 20')

let Cat = mongoose.model('Cat', catSchema)

// let ownerSchema = new mongoose.Schema({
//   firstName: {type: String, required: true, unique: true},
//   lastName: {type: String, required: true, unique: true},
//   age: {type: Number, min: 0, max: 100}
// })

// // Adding a virtual props, they dont go to the DB
// ownerSchema.virtual('fullName').get(function () {
//   return this.firstName + ' ' + this.lastName
// })

// let Owner = mongoose.model('Owner', ownerSchema)

mongoose.connect(connection, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(err)
    return
  }

  let cat = new Cat({
    name: 'Chaos',
    age: -10
  })

  cat
    .save()
    .then(cat => {
      console.log(cat)
    })
    // will trigger the catch statement, because of invalid input data
    .catch(err => {
      let errors = err.errors
      for (let errKey in errors) {
        console.log(errors[errKey].message)
      }
    })
})
