const User = require('../models/User')
const encryption = require('../utilities/encryption')
const Product = require('../models/Product')

module.exports.registerGet = (req, res) => {
  res.render('user/register')
}

module.exports.registerPost = (req, res) => {
  let user = req.body

  if (user.password && user.password !== user.confirmedPassword) {
    user.error = 'Passwords do not match.'
    res.render('user/register', user)
    return
  }

  // generate unique salt for the user and save it
  let salt = encryption.generateSalt()
  user.salt = salt

  if (user.password) {
    let hashedPassword = encryption.generateHashedPassword(salt, user.password)
    user.password = hashedPassword
  }

  User.create(user).then(user => {
    req.logIn(user, (error, user) => {
      if (error) {
        res.render('users/register', { error: 'Authentication not working!' })
        return
      }

      res.redirect('/')
    })
  })
    .catch(error => {
      // if User.create fails this method will be invoked
      user.error = error
      res.render('user/register', user)
    })
}

module.exports.loginGet = (req, res) => {
  res.render('user/login')
}

module.exports.loginPost = (req, res) => {
  let userToLogin = req.body

  User.findOne({ username: userToLogin.username }).then(user => {
    if (!user || !user.authenticate(userToLogin.password)) {
      res.render('user/login', { error: 'Invalid credentials!' })
    } else {
      req.logIn(user, (error, user) => {
        if (error) {
          res.render('user/login', { error: 'Authentication not working!' })

          return
        }

        res.redirect('/')
      })
    }
  })
}

module.exports.logout = (req, res) => {
  req.logout()
  res.redirect('/')
}

module.exports.getUserInfo = (req, res) => {

  Product.find({buyer: res.locals.user._id}).then(products => {
    let data = products
    res.render('user/profile', { user: res.locals.user, products: data })
  })
}
