async function myFunction () {
  console.log('makeCar is triggered')

  makeCar()

  function makeCar () {
    return 0
  }
}

module.exports = {
  myFunction
}
