// npm install formidable
// and don't forget to add the enctype="multipart/form-data" in the html form and input type always with name=""

const http = require('http')
const fs = require('fs')
const formidable = require('formidable')

http
  .createServer((req, res) => {
    if (req.method === 'GET') {
      // return an empty html form
    } else if (req.method === 'POST') {
      let form = new formidable.IncomingForm()

      form.parse(req, (err, fields, files) => {
        if (err) {
          console.log(err)
          return
        }

        // console.log(fields)
        // console.log(files)
        let uploadFile = files['upload']

        // size, path, name, type are available if some type of check or restriction is needed
        fs.rename(uploadFile.path, './' + uploadFile.name, err => {
          if (err) {
            console.log(err)
            return
          }

          res.write('Thank you!')
          res.end()
        })
      })
    }
  })
  .listen(1337)
