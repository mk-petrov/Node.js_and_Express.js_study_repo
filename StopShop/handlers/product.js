const fs = require('fs')
const path = require('path')
// const database = require('../config/database')
const url = require('url')
const qs = require('querystring')
const multiparty = require('multiparty')
const shortid = require('shortid')
const Product = require('../models/Product')

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.ulr).pathname

  if (req.pathname === '/product/add' && req.method === 'GET') {
    let filePath = path.normalize(path.join(__dirname, '../views/products/add.html'))

    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.log(err)
      }

      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      res.write(data)
      res.end()
    })
  } else if (req.pathname === '/product/add' && req.method === 'POST') {
    let form = new multiparty.Form()
    let product = ''

    form.on('part', (part) => {
      if (part.filename) {
        let fileExtension = part.filename.split('.')[1]
        let dataString = ''

        part.setEncoding('binary')
        part.on('data', (data) => {
          dataString += data
        })
        product = qs.parse(dataString)

        part.on('end', () => {
          let fileName = shortid.generate()
          let filePath = `/content/images/${fileName + '.' + fileExtension}`

          product.image = filePath

          fs.writeFile(`.${filePath}`, dataString, {encoding: 'ascii'}, (err) => {
            if (err) {
              console.log(err)
            }
          })
        })
      } else {
        part.setEncoding('utf8')
        let field = ''
        part.on('data', (data) => {
          field += data
        })

        part.on('end', () => {
          product[part.name] = field
        })
      }
    })
    form.on('close', () => {
      Product.create(product).then(() => {
        res.writeHead(302, {
          Location: '/'
        })
        res.end()
      })
    })

    form.parse(req)
  } else {
    // Process as not handled request
    return true
  }
}
