const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.ObjectId

mongoose.Promise = global.Promise

let connection = 'mongodb://localhost:27017/mongooseDemoSchema2'

let catSchema = new mongoose.Schema({
  name: {type: String, required: true},
  age: {type: Number, default: 0, min: 0, max: 30},
  owner: {type: ObjectId} // save the cats owner by Id
})

let Cat = mongoose.model('Cat', catSchema)

let ownerSchema = new mongoose.Schema({
  firstName: {type: String, required: true, unique: true},
  lastName: {type: String, required: true, unique: true},
  age: {type: Number, min: 0, max: 100}
})

// Adding a virtual props, they dont go to the DB
ownerSchema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName
})

let Owner = mongoose.model('Owner', ownerSchema)

mongoose.connect(connection, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(err)
    return
  }

  new Owner({
    firstName: 'Petko',
    lastName: 'Petrov'
  }).save()
    .then(owner => {
      console.log(owner.fullName)
    })
})
