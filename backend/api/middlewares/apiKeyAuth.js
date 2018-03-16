const ApiKey = require('../models/ApiKey')

module.exports = (req, res, next) => {
  let token = req.query.api_key

  ApiKey.findOne({
    where: {
      token
    }
  }).then((apiKey) => {
    if (apiKey) {
      next()
    } else {
      next({
        status: 403,
        message: 'You must provide a valid api key'
      })
    }
  }).catch(next)
}
