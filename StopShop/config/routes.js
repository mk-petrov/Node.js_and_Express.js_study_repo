<<<<<<< HEAD
const handlers = require('../handlers') // by default will seacrh index.js file
const multer = require('multer')

let upload = multer({dest: './content/images'})

module.exports = (app) => {
  app.get('/', handlers.home.index)

  app.get('/product/add', handlers.product.addGet)
  app.post('/product/add', upload.single('image'), handlers.product.addPost)

  app.get('/category/add', handlers.category.addGet)
  app.post('/category/add', handlers.category.addPost)
}
=======
const handlers = require('../handlers') // by default will seacrh index.js file
const multer = require('multer')

let upload = multer({dest: './content/images'})

module.exports = (app) => {
  app.get('/', handlers.home.index)

  app.get('/product/add', handlers.product.addGet)
  app.post('/product/add', upload.single('image'), handlers.product.addPost)

  app.get('/category/add', handlers.category.addGet)
  app.post('/category/add', handlers.category.addPost)
}
>>>>>>> d52be0998f30ec3dd56b1a748b3bdfcb3504bf80
