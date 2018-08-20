const fs = require('fs')
const path = require('path')
const dbPath = path.join(__dirname, '/database.json')

let productsInMemory = [] // getProducts()

let checkExistence = (products) => {
  for (let product of products) {
    // console.log(productsInMemory[0].id)
    // console.log()
    // console.log(product.id)
    if (productsInMemory.length === 0) {
      productsInMemory.push(product)
    } else {
      for (let i = 0; i < productsInMemory.length; i++) {
        if (productsInMemory[i].id === product.id - 1) {
          productsInMemory.push(product)
        }
      }
    }

    // if (!productsInMemory.product.id === product.id) {
    // }
  }
  return productsInMemory
}

function getProducts () {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, productsInMemory)
    return []
  }

  let json = fs.readFileSync(dbPath).toString() // || '[]'
  let products = JSON.parse(json)
  checkExistence(products)
  return productsInMemory
}

function saveProducts (products) {
  let json = JSON.stringify(products)
  fs.writeFileSync(dbPath, json)
}

module.exports.products = {}

module.exports.products.getAll = getProducts

module.exports.products.add = (product) => {
  // let products = fs.readFileSync(dbPath).toString()
  // products = Array.from(products)
  product.id = productsInMemory.length + 1
  productsInMemory.push(product)
  saveProducts(productsInMemory)
}

module.exports.products.findByName = (name) => {
  let productsAsJson = fs.readFileSync(dbPath)
  let products = JSON.parse(productsAsJson)
  let product = null
  for (let p of products) {
    if (name === p) {
      return p
    }
  }

  return product
}
