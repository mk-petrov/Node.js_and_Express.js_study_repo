const Product = require('../models/Product')
const Category = require('../models/Category')

module.exports.addGet = (req, res) => {
  Category
    .find()
    .then((categories) => {
      res.render('product/add', { categories: categories })
    })
}

module.exports.addPost = (req, res) => {
  let productObj = req.body
  productObj.image = '\\' + req.file.path

  Product.create(productObj).then((product) => {
    Category.findById(product.category).then(category => {
      category.products.push(product._id)
      category.save()
    })

    res.redirect('/')
  })
}

module.exports.editGet = (req, res) => {
  let id = req.params.id
  Product
    .findById(id)
    .then(product => {
      if (!product) {
        res.status(404).send('Not Found')
        return
      }

      Category
        .find()
        .then(categories => {
          res.render('product/edit', {
            product: product,
            categories: categories
          })
        })
    })
}

module.exports.editPost = (req, res) => {
  let id = req.params.id
  let editedProduct = req.body

  Product
    .findById(id).then(product => {
      if (!product) {
        res.redirect(`/?error=${encodeURIComponent('error=Product was not found!')}`)
        return
      }
      product.name = editedProduct.name
      product.description = editedProduct.description
      product.price = editedProduct.price

      if (req.file) {
        product.image = '\\' + req.file.path
      }

      /* Whenever we change some product's category we should go to that old category and remove product's reference
       from it and last but least in the new category we should add product's reference. */

      // First we check if the category is changed
      if (product.category.toString() !== editedProduct.category.toString()) {
        // If so find the "current" and "next" category
        Category.findById(product.category).then((currentCategory) => {
          Category.findById(editedProduct.category).then((nextCategory) => {
            let index = currentCategory.products.indexOf(product._id)

            if (index >= 0) {
              // Remove product specified from current category's list of products
              currentCategory.products.splice(index, 1)
            }
            currentCategory.save()

            // Add product's reference to the "new" category
            nextCategory.products.push(product._id)
            nextCategory.save()

            product.category = editedProduct.category
          })
        })
      }

      // Save the product
      product.save().then(() => {
        // String interpolation avoided for space or "/"
        res.redirect('/?success=' + encodeURIComponent('Product was edited successfully'))
      })
    })
}
