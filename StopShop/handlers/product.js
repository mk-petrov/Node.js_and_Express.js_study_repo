<<<<<<< HEAD
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
=======
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
>>>>>>> d52be0998f30ec3dd56b1a748b3bdfcb3504bf80
