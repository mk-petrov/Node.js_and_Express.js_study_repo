const fs = require('fs')

let readStream = fs.createReadStream('./writeableStreamDemo.js')
let writeStream = fs.createWriteStream('./writeableStreamDemo.copy.js')

readStream.on('data', (data) => writeStream.write(data))
readStream.on('end', () => console.log('Done!'))
