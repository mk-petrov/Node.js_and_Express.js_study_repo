const Product = require('../models/product')

exports.products_get_all = (req, res, next) => {
  Product
    .find()
    .select('name price productImage') // will fetch only this data fields and _id by default too
    .exec()
    .then(docs => {
      // if the array is empty
      if (docs.length === 0) {
        res.status(404).json({ message: 'No entries found' })
        return
      }

      // metadata about the response
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            // name: doc.name,
            // price: doc.price,
            // _id: doc._id, // 18:48
            // productImage: doc.productImage,
            ...doc._doc,
            request: {
              type: 'GET',
              url: `http://localhost:3000/products/${doc._id}`
            }
          }
        })
      }

      res.status(200).json(response)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
}

exports.products_create_product = (req, res, next) => {
  // console.log(req.file) // new option available because of multer with method single
  const product = new Product({
    // _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path
  })
  product
    .save()
    .then(result => {
      console.log(result)
      res.status(201).json({
        message: 'Successfully created product!',
        createdProduct: {
          ...result._doc,
          request: {
            type: 'GET',
            url: `http://localhost:3000/products/${result._id}`
          }
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
}

exports.products_get_product = (req, res, next) => {
  const id = req.params.productId
  Product
    .findById(id)
    .select('name price productImage')
    .exec()
    .then(doc => {
      if (!doc) {
        res.status(404).json({ message: 'No valid entry found for the provided ID' })
        return
      }
      res.status(200).json({
        product: doc,
        request: {
          type: 'GET',
          description: 'Get all products',
          url: 'http://localhost:3000/products'
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
}

// Valid patch request, can be with only one object if, only 1 prop will be updated
// [
// { "propName": "name", "value": "Video4" },
// { "propName": "price", "value": "16.89" }
// ]
exports.products_patch_product = (req, res, next) => {
  const id = req.params.productId
  const updateOps = {}

  // sets the new values, but new fields are not allowed (safety reasons), should be past an array
  for (let ops of req.body) {
    updateOps[ops.propName] = ops.value
  }

  Product
    .update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Product updated',
        request: {
          type: 'GET',
          url: `http://localhost:3000/products/${id}`
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
}

exports.products_delete_product = (req, res, next) => {
  const id = req.params.productId
  Product
    .remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Product deleted successfully!',
        request: {
          description: 'Create a new product',
          type: 'POST',
          url: 'http://localhost:3000/products',
          body: { name: 'String', price: 'Number' }
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
}
