const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.user_signup = (req, res, next) => {
  // check if email exist in DB, if true reject signup
  User
    .find({ email: req.body.email })
    .exec()
    .then(user => {
      // if user not exists db will return an empty array, not null that's why check the length property
      if (user.length >= 1) {
        return res.status(409).json({ message: 'Email exists already' })
      }

      // salt and hash the password
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({ error: err })
        }
        // create user
        const user = new User({
          email: req.body.email,
          password: hash
        })
        // save user in DB
        user
          .save()
          .then(result => {
            console.log(result)
            res.status(201).json({
              message: 'User created'
            })
          })
          .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
          })
      })
    })
}

exports.user_login = (req, res, next) => {
  User
    .findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'Authorization failed'
        })
      }

      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Authorization failed'
          })
        }

        if (result) {
          // JWT
          const token = jwt.sign({
            email: user.email,
            userId: user._id
          },
          process.env.JWT_KEY,
          {
            expiresIn: '1h'
          })

          return res.status(200).json({
            message: 'Authorization successful',
            token: token
          })
        }

        res.status(401).json({
          message: 'Authorization failed'
        })
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
}

exports.user_delete = (req, res, next) => {
  User
    .remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({ message: 'User deleted' })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
}
