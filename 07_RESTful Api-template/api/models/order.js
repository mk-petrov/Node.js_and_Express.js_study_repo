const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = mongoose.Schema({
  product: { type: ObjectId, required: '{PATH} is required', ref: 'Product' },
  quantity: { type: Number, default: 1, min: 1, required: '{PATH} is required' }
})

module.exports = mongoose.model('Order', orderSchema)
