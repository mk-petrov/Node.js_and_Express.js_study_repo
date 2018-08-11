const storage = require('./storage')

storage.put('first', 'some value')
storage.put('second', true)
storage.put('third', false)

// Test get
let someValue = storage.get('first')
console.log(someValue)

// Test update
storage.update('first', 'another value')
someValue = storage.get('first')
console.log(someValue)

// Sync way
// storage.save()
// storage.clear()
// storage.load()
// someValue = storage.get('first')
// console.log(someValue)

// Async way, all function are waiting save to finish

// Callback testing
// storage.save(() => {
//   storage.clear()
//   storage.load(() => {
//     someValue = storage.get('first')
//     console.log(someValue)
//   })
// })

// Promise testing
storage
  .save()
  .then(() => {
    storage.clear()
    storage.printData()

    storage
      .load()
      .then(() => { storage.printData() })
  })
