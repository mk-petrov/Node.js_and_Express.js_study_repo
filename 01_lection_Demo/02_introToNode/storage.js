const fs = require('fs')

const dataFile = 'storage.dat'

// Load data in memory
let data = {}

let validateKeyAsString = (key) => {
  if (typeof key !== 'string') {
    throw new Error('Key must be a string')
  }
}

// If prop not exists
let validateKeyExists = (key) => {
  if (!data.hasOwnProperty(key)) {
    throw new Error('Key could not be found')
  }
}

let put = (key, value) => {
  validateKeyAsString(key)

  // If prop exists
  if (data.hasOwnProperty(key)) {
    throw new Error('Key already exists')
  }

  data[key] = value
}

let get = (key) => {
  validateKeyAsString(key)
  validateKeyExists(key)

  return data[key]
}

let update = (key, value) => {
  validateKeyAsString(key)
  validateKeyExists(key)

  data[key] = value
}

let deleteItem = (key) => {
  validateKeyAsString(key)
  validateKeyExists(key)

  delete data[key]
}

let clear = () => {
  // delete data
  data = {}
}

// Sync way
// let save = () => {
//   let dataAsString = JSON.stringify(data)
//   fs.writeFileSync(dataFile, dataAsString)
//   console.log('Data is saved successfully')
// }

// let load = () => {
//   let dataAsString = fs.readFileSync(dataFile, 'utf8')
//   data = JSON.parse(dataAsString)
// }

// Callback way
let save = (callback) => {
  let dataAsString = JSON.stringify(data)
  fs.writeFile(dataFile, dataAsString, (err) => {
    if (err) {
      console.log(err)
      return
    }

    callback()
  })

  console.log('Data is saved successfully')
}

let load = (callback) => {
  fs.readFile(dataFile, 'utf8', (err, dataJson) => {
    if (err) {
      console.log(err)
      return
    }

    data = JSON.parse(dataJson)
    callback()
  })
}

module.exports = {
  put: put,
  get: get,
  update: update,
  delete: deleteItem,
  clear: clear,
  save: save,
  load: load
}
