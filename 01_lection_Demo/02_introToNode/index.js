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

// Test save
storage.save()

// Test clear
storage.clear()

// Test load
storage.load()
someValue = storage.get('first')
console.log(someValue)
