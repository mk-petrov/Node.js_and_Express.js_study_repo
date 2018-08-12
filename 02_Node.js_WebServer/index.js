const http = require('http')
const url = require('url')
const handlers = require('./handlers/index')

const port = 9876

http
  .createServer((req, res) => {
    req.path = url.parse(req.url).pathname

    for (let handler of handlers) {
      let next = handler(req, res)
      if (!next) {
        // or if (next) continue
        break
      }
    }
  })
  .listen(port)

console.log(`Node server listening on ${port}`)
