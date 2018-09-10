const Product = require('../models/Product')

module.exports.index = (req, res) => {
  let queryData = req.query

  Product
    .find()
    .populate('category')
    .then((products) => {
      if (queryData.query) {
        products = products.filter((e) => e.name.toLowerCase().includes(queryData.query.toLowerCase()))
      }
      res.render('home/index', { products: products })
    })
}
