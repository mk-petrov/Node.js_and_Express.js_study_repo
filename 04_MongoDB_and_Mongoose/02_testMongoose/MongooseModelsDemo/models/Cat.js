const mongoose = require('mongoose')

let catSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  age: { type: Number }
})

mongoose.model('Cat', catSchema)

module.exports = mongoose.model('Cat')
