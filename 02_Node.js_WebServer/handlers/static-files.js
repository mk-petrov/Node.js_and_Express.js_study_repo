const fs = require('fs')

let getContentType = (url) => {
  // need to be added for png and etc..
  let contentType = 'text/plain'
  if (url.endsWith('.css')) {
    contentType = 'text/css'
  } else if (url.endsWith('.js')) {
    contentType = 'application/javascript'
  }

  return contentType
}

module.exports = (req, res) => {
  // Generic file search
  // need to be restricted only for folder content
  fs.readFile('.' + req.path, (err, data) => {
    if (err) {
      // Global error handling
      res.writeHead(404)
      res.write('<h1>404 Not Found - Check your URL!</h1>')
      res.end()
      return
    }

    res.writeHead(200, {
      'Content-Type': getContentType(req.path)
    })
    res.write(data)
    res.end()
  })
}
