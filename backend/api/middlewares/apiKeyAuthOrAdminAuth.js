var adminAuth = require('./adminAuth')
var apiKeyAuth = require('./apiKeyAuth')

// Some api routes can be reach by both admins and apikeys
// We choose the correct middleware according the header
module.exports = (req, res, next) => {
  if (req.headers['authorization']) {
    adminAuth(req, res, next)
  } else {
    apiKeyAuth(req, res, next)
  }
}
