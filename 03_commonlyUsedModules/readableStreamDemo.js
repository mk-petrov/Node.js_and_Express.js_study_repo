const fs = require('fs')

let readStream = fs.createReadStream('./readableStreamDemo.js')

let result = ''

readStream.on('data', (data) => {
  result += data
  // res.write(data) for sending data to the browser
})

readStream.on('end', () => {
  console.log(result)
  // res.end()
})
