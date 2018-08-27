const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.ObjectId

mongoose.Promise = global.Promise

let connection = 'mongodb://localhost:27017/mongooseDemoSchema2'

let catSchema = new mongoose.Schema({
  name: {type: String, required: true},
  age: {type: Number, default: 0, min: 0, max: 30},
  owner: {type: ObjectId} // save the cats owner by Id
})

// Methods has to be added before the model asignment
// Do not use arrow function syntax, because of this binding
catSchema.methods.sayHello = function () {
  return `Hello my name is ${this.name}. I am ${this.age} years old!`
}

let Cat = mongoose.model('Cat', catSchema)

let ownerSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true}, // index: true (helps the search, but trade off is writing to the db)
  age: {type: Number, min: 0, max: 100}
})

let Owner = mongoose.model('Owner', ownerSchema)

mongoose.connect(connection, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(err)
    return
  }

  Owner
    .find({})
    .then(owners => {
      console.log(owners)

      for (let owner of owners) {
        Cat
          .find({owner: owner._id})
          .then(cats => {
            console.log(cats)
          })
          .catch(err => {
            let errors = err.errors
            for (let errKey in errors) {
              console.log(errors[errKey].message)
            }
          })
      }
    })
    .catch(err => {
      let errors = err.errors
      for (let errKey in errors) {
        console.log(errors[errKey].message)
      }
    })
})
