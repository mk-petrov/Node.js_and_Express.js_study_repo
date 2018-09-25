const User = require('../models/User')
const encryption = require('../utilities/encryption')

module.exports.registerGet = (req, res) => {
  res.render('user/register')
}
