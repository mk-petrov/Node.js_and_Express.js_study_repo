const net = require('net')
const msgpack = require('msgpack5')()
const db = require('./database')

const queryKeys = 'SELECT * FROM keys'
const queryValues = 'SELECT * FROM values'
const client = new net.Socket()

client.connect(1337, '127.0.0.1', function () {
  client.write('From Client.')
})
const dataArray = []

client.on('data', function (data) {
  dataArray.push(data)
})

client.on('end', function () {
  let data = Buffer.concat(dataArray)
  let infoObject = msgpack.decode(msgpack.encode(data.toString()))
  let parsedData = JSON.parse(infoObject)

  db.getConnection()
    .then(connection => {
      for (let key in parsedData) {
        connection.query('INSERT INTO keys value (?)', [key])
        connection.query('INSERT INTO values value (?)', [parsedData[key]])
      }
      return connection
    )
    .then(
      // setTimeout - fetch data from database
    )
    .catch(err => {
      console.log(err)
      connection.end()
    })
})

client.on('error', function (err) {
  throw new Error(err)
})

client.on('close', function () {
  console.log('Connection closed')
})
