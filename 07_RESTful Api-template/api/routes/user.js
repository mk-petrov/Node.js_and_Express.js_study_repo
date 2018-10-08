const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user')
const checkAuth = require('../middleware/check-auth')

// overall path will be: /user/signup. No logout logic needed, because there is no session (signup and login only)
router.post('/signup', UserController.user_signup)
router.post('/login', UserController.user_login)
router.delete('/:userId', checkAuth, UserController.user_delete)

module.exports = router
