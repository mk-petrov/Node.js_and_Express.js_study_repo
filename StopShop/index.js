let environment = process.env.NODE_ENV || 'development'
const config = require('./config/config')
const database = require('./config/database.config')
const express = require('express')

const app = express()
database(config[environment])
require('./config/express')(app, config[environment])
require('./config/routes')(app)

const port = 3000

app.listen(port)

console.log(`Server is running on port ${port}`)
