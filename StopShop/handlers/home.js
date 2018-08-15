const fs = require('fs')
const url = require('url')
const path = require('path')

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname === '/' && req.method === 'GET') {
    // to do
  } else {
    return true
  }
}
