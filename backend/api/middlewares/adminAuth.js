
const Setting = require('../models/Setting')
const jwt = require('jsonwebtoken')
const secret = require('../../jwt-secret')

let adminPassword = null

Setting.findById('admin-password').then((setting) => {
  adminPassword = setting.value
})

module.exports = (req, res, next) => {
  const secretKey = secret.getSecret()
  jwt.verify(req.headers['authorization'], secretKey, (err, decoded) => {

    if (err) {
      next({
        status: 403,
        message: 'Not authorized'
      })
    } else {
      next()
    }
  })
}