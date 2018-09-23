const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.ObjectId

let productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: {
    type: Number,
    min: 0,
    max: Number.MAX_VALUE,
    default: 0
  },
  image: { type: String },
  category: { type: ObjectId, ref: 'Category', required: true },
  buyer: { type: ObjectId, ref: 'User' },
  creator: { type: ObjectId, ref: 'User', required: true }
})

let Product = mongoose.model('Product', productSchema)

module.exports = Product
