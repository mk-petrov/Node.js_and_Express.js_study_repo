const http = require('http')
const url = require('url')
// const fs = require('fs')
const port = 9876

http
  .createServer((req, res) => {
    // Always call the res methods as follows:
    // writeHead (One time)
    // write (One or many times)
    // end (One time)
    // use url build in parse only for the root, no queries
    let path = url.parse(req.url).pathname
    console.log(path)
    res.writeHead(200, {
      // All Content types
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
      'Content-Type': 'text/html'
    })
    res.write('<h1>HI FROM NODE</h1>')
    res.write('<h2>Server is running</h2>')
    res.end()
  })
  .listen(port)

console.log(`Node server listening on ${port}`)
