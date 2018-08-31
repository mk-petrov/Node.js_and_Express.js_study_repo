const mongoose = require('mongoose')

let ownerSchema = new mongoose.Schema({
  firstName: {type: String, required: true, unique: true},
  lastName: {type: String, required: true, unique: true},
  age: {type: Number, min: 0, max: 100}
})

// Adding a virtual props, they dont go to the DB
ownerSchema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName
})

mongoose.model('Owner', ownerSchema)

module.exports = mongoose.model('Owner')
