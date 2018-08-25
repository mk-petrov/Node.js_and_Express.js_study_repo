const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.ObjectId

mongoose.Promise = global.Promise

let connection = 'mongodb://localhost:27017/mongooseDemoSchema2'

let catSchema = new mongoose.Schema({
  name: {type: String, required: true},
  age: {type: Number, default: 0, min: 0, max: 30},
  owner: {type: ObjectId} // save the cats owner by Id
})

let Cat = mongoose.model('Cat', catSchema)

let ownerSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true}, // index: true (helps the search, but trade off is writing to the db)
  age: {type: Number, min: 0, max: 100}
})

let Owner = mongoose.model('Owner', ownerSchema)

mongoose.connect(connection, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(err)
    return
  }

  // create new Owner
  let owner = new Owner({
    name: 'Ivan'
  })

  // save the owner and give his Id to the cat
  owner
    .save()
    .then(owner => {
      // create new Cat
      let cat = new Cat({
        name: 'Wiskas',
        age: 2,
        owner: owner._id
      })

      cat
        .save()
        .then(cat => {
          console.log(cat)
        })
        .catch(err => {
          let errors = err.errors
          for (let errKey in errors) {
            console.log(errors[errKey].message)
          }
        })
    })
    .catch(err => {
      let errors = err.errors
      for (let errKey in errors) {
        console.log(errors[errKey].message)
      }
    })
})
