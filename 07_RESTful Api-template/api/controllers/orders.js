const Order = require('../models/order')
const Product = require('../models/product')

exports.orders_get_all = (req, res, next) => {
  Order
    .find({})
    .select('product quantity')
    .populate('product', 'name') // select just the name and _id of the populated product
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            ...doc._doc,
            request: {
              type: 'GET',
              url: `http://localhost:3000/orders/${doc._id}`
            }
          }
        })
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}

exports.orders_create_order = (req, res, next) => {
  // check first if there is a product wich such an id
  Product
    .findById(req.body.productId)
    .then(product => {
      // prevent the case of null
      if (!product) {
        return res.status(404).json({
          message: 'Product not found'
        })
      }

      // parse data from req
      const order = new Order({
        quantity: req.body.quantity,
        product: req.body.productId
      })
      // save the order in DB
      // .exec() is needed by find() method and not by save()
      return order.save()
    })
    .then(result => {
      res.status(201).json({
        message: 'Order stored',
        createdOrder: { ...result._doc },
        request: {
          type: 'GET',
          url: `http://localhost:3000/orders/${result._id}`
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}

exports.orders_get_order = (req, res, next) => {
  const id = req.params.orderId
  Order
    .findById(id)
    .select('product quantity')
    .populate('product')
    .exec()
    .then(order => {
      if (!order) {
        res.status(404).json({ message: 'No valid entry found for the provided ID' })
        return
      }
      res.status(200).json({
        order: order,
        request: {
          type: 'GET',
          description: 'Get all orders',
          url: 'http://localhost:3000/orders'
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
}

exports.orders_delete_order = (req, res, next) => {
  const id = req.params.orderId
  Order
    .remove({ _id: id })
    .exec()
    .then(deleteResult => {
      res.status(200).json({
        message: 'Order deleted successfully!',
        request: {
          description: 'Create a new order',
          type: 'POST',
          url: 'http://localhost:3000/orders',
          body: { product: 'ObjectId', quantity: 'Number' }
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
}
