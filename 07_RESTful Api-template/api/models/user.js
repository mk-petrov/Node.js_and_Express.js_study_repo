const mongoose = require('mongoose')
const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: '{PATH} is required',
    unique: true, // unique: true is not enough validation for existing emails
    match: emailRegex
  },
  password: { type: String, required: '{PATH} is required' }
})

module.exports = mongoose.model('User', userSchema)
