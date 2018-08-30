const mongoose = require('mongoose')

mongoose.Promise = global.Promise

let connection = 'mongodb://localhost:27017/mongooseDemoSchema2'

let catSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number }
})

let Cat = mongoose.model('Cat', catSchema)

mongoose.connect(connection, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(err)
    return
  }

  // find all by given criteria and update them with some new value
  Cat
    .find({property: '/by RegEx/'})
    .where('age').gt(5).lt(15) // all with age > 5 and < 15, 'gte' for >=, 'lt' for <
    .where('name').equals('Ivan') // all with name Ivan
    .then(cats => {
      console.log(cats)
    })
    .catch(err => {
      let errors = err.errors
      for (let errKey in errors) {
        console.log(errors[errKey].message)
      }
    })
})
