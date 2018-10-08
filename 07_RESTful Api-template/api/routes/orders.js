const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

const OrdersController = require('../controllers/orders')

// /orders is no needed, because it's in the base, parse only the rest after that
router.get('/', checkAuth, OrdersController.orders_get_all)

// 201 success, resource created
router.post('/', checkAuth, OrdersController.orders_create_order)

router.get('/:orderId', checkAuth, OrdersController.orders_get_order)

router.delete('/:orderId', checkAuth, OrdersController.orders_delete_order)

// this way the router will can be used in another files
module.exports = router
