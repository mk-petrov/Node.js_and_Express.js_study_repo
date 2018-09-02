const express = require('express')
const app = express()
const port = process.env.PORT || 2557

// Handles get request to '/'
app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

// Paths can have parameters
app.get('/users/:userId/books/:bookId', (req, res) => {
  res.send(req.params)
})

// Basic unexpected route handler
app.all('*', (req, res) => {
  res.send('404 Not Found')
})

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`)
})
