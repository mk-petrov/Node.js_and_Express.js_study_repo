const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')
const userRoutes = require('./api/routes/user')

// Setup mongoose promise and connection
mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true)
mongoose.connect(`mongodb+srv://adminPetrov:${process.env.MONGO_ATLAS_PWD}@node-rest-api-demo-ioimj.mongodb.net/test?retryWrites=true`, {
  useNewUrlParser: true
})

// Use the Logger middleware
app.use(morgan('dev'))
// Use static
app.use('/uploads', express.static('uploads'))
// Use body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Adjust the res with additional headres to prevent CORS errors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

// Routes which should handle requests
app.use('/products', productRoutes) // '/products' works like a filter, only req starting with this will be handled by the middleware
app.use('/orders', orderRoutes)
app.use('/user', userRoutes)

// Error handling
app.use((req, res, next) => {
  const error = new Error('Not found!')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app
