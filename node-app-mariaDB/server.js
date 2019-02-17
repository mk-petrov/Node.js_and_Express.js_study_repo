const net = require('net')
const fs = require('fs')
// let dataStringTest = 'asdasdfsda'

const server = net.createServer(function (socket) {
  socket.on('data', function () {
    fs.readFile('./package.json', function (err, data) {
      if (err) {
        throw new Error(err)
      }
      // console.log(data)
      socket.write(data)
      socket.end()
    })
    // setInterval(function () {
    //   socket.write(dataStringTest)
    // }, 1000)
  })
  socket.on('error', function (err) {
    console.log(err)
  })
  socket.on('end', function () {
    console.log('server disconected')
  })
})

server.listen(1337, '127.0.0.1')
