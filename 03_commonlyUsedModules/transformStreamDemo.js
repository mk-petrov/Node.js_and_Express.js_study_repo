const fs = require('fs')
const zlib = require('zlib')

let readStream = fs.createReadStream('./transformStreamDemo.js')
let writeStream = fs.createWriteStream('./transformStreamDemo.js.gz') // it's important to add the 'gz' extension

let gzip = zlib.createGzip()

readStream
  .pipe(gzip)
  .pipe(writeStream)
