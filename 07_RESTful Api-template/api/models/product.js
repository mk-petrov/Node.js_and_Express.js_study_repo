const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: '{PATH} is required' },
  price: { type: Number, required: '{PATH} is required', min: 0 },
  productImage: { type: String }
})

module.exports = mongoose.model('Product', productSchema)
