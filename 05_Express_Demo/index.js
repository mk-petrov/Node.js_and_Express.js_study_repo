const express = require('express')
const app = express()
const port = process.env.PORT || 2557

app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

app.get('/users/:userId/books/:bookId', (req, res) => {
  res.send(req.params)
})

app.all('*', (req, res) => {
  res.send('404 Not Found')
})

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`)
})
