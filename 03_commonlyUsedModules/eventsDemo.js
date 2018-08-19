const events = require('events')

let emmiter = new events.EventEmitter()

emmiter.on('myCustomEvent', (data) => {
  console.log(data)
})

emmiter.emit('myCustomEvent', {
  name: 'Petko'
})
