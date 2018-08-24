const mongoose = require('mongoose')

mongoose.Promise = global.Promise

let connection = 'mongodb://localhost:27017/mongooseTestDemo'

let Cat = mongoose.model('Cat', {
  name: {type: String, required: true},
  age: {type: Number, default: 0}
})

mongoose.connect(connection, (err) => {
  if (err) {
    console.log(err)
    return
  }

  let cat = new Cat({
    name: 'Pesho',
    age: 3
  })

  // first start will save the cat
  // cat
  //   .save()
  //   .then(cat => {
  //     console.log(cat)
  //   })

  // search by criteria
  // Cat
  //   .find({})
  //   .then(cats => {
  //     console.log(cats)
  //   })
})
