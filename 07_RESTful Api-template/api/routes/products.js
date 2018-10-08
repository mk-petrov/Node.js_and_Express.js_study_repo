const express = require('express')
const router = express.Router()
const multer = require('multer')
const checkAuth = require('../middleware/check-auth')

const ProductsController = require('../controllers/products')

// multer will execute this functions when a new file is received
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads/')
  },
  filename: function (req, file, callback) {
    callback(null, new Date().toISOString() + file.originalname)
  }
})

// specify accepted file types for upload
const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true) // save the image
  } else {
    callback(null, false) // dont save the image
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2 // max file size in bytes (in this case max 2MB)
  },
  fileFilter: fileFilter
})

// /product is no needed, because it's in the base, parse only the rest after that
router.get('/', ProductsController.products_get_all)
router.post('/', checkAuth, upload.single('productImage'), ProductsController.products_create_product)
router.get('/:productId', ProductsController.products_get_product)
router.patch('/:productId', checkAuth, ProductsController.products_patch_product)
router.delete('/:productId', checkAuth, ProductsController.products_delete_product)

// this way the router will can be used in another files
module.exports = router
