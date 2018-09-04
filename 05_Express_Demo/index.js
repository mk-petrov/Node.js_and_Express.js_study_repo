const express = require('express')
const app = express()
const port = process.env.PORT || 2557
const path = require('path')

app.use(express.static('public'))
// app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/html/index.html'))
})

app.post('/', (req, res) => {
  res.send('Hi')
  console.log(req.body)
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
