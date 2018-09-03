const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.ObjectId

let categorySchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  products: [ { type: ObjectId, ref: 'Product' } ] // one-to-many relationship
})

let Category = mongoose.model('Category', categorySchema)

module.exports = Category
