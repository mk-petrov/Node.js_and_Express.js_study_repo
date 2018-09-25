const controllers = require('../controllers') // by default will seacrh index.js file
const multer = require('multer')

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./content/images/`)
  },
  filename: (req, file, cb) => {
    if (file.mimetype === 'image/png') {
      cb(null, Date.now() + file.originalname)
    }
  }
})
// specify accepted file types for upload
const fileFilter = (req, file, callback) => {
  // console.log(file)
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true) // save the image
  } else {
    callback(null, false) // dont save the image
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3 // max file size in bytes (in this case max 3 MB)
  },
  fileFilter: fileFilter
})

module.exports = (app) => {
  app.get('/', controllers.home.index)

  app.get('/product/add', controllers.product.addGet)
  app.post('/product/add', upload.single('image'), controllers.product.addPost)

  app.get('/category/add', controllers.category.addGet)
  app.post('/category/add', controllers.category.addPost)

  app.get('/category/:category/products', controllers.category.productByCategory)

  app.get('/product/edit/:id', controllers.product.editGet)
  app.post('/product/edit/:id', upload.single('image'), controllers.product.editPost)
  app.get('/product/delete/:id', controllers.product.deleteGet)
  app.post('/product/delete/:id', controllers.product.deletePost)

  app.get('/user/register', controllers.user.registerGet)
}
