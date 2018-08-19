const crypto = require('crypto')

// foreach user we have to save his salt and his hash. The salt will be different for every user

let generateSalt = () => {
  return crypto.randomBytes(128).toString('base64')
}

let generateHashedPassword = (salt, pwd) => {
  let hmac = crypto.createHmac('sha256', salt) // or 'sha1'
  return hmac.update(pwd).digest('hex')
}

let salt = generateSalt()
let pass = 'pas123'
let hashedPass = generateHashedPassword(salt, pass)

console.log(hashedPass)
