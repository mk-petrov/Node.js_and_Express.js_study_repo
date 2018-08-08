const fs = require('fs')

// Require a module
const makeCar = require('./newjs').myFunction
const testModule = require('./test-module')
const anotherModule = require('./anotherModule')

// readFile is async code, and 'utf8' is needed because will read the file like a buffer
// By convention the callback function always takes the error as a first parameter and it's last parameter in the
// function that is used

fs.readFile('index.js', 'utf8', (err, data) => {
  if (err) {
    console.log(err)
    return
  }

  console.log(data)
})

console.log('Finished')
console.log(testModule.result)
console.log(makeCar)
anotherModule()
