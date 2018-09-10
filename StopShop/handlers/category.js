<<<<<<< HEAD
const Category = require('../models/Category')

module.exports.addGet = (req, res) => {
  res.render('category/add')
}

module.exports.addPost = (req, res) => {
  let category = req.body
  Category.create(category).then(() => {
    res.redirect('/')
  })
}
=======
const Category = require('../models/Category')

module.exports.addGet = (req, res) => {
  res.render('category/add')
}

module.exports.addPost = (req, res) => {
  let category = req.body
  Category.create(category).then(() => {
    res.redirect('/')
  })
}
>>>>>>> d52be0998f30ec3dd56b1a748b3bdfcb3504bf80
