const ApiKey = require('../models/ApiKey')

module.exports = (req, res, next) => {
  let token = req.mergedParams.api_key

  ApiKey.findOne({
    where: {
      token
    }
  }).then((apiKey) => {
    if (apiKey) {
      apiKey.counter += 1
      apiKey.latest_use = new Date()
      apiKey.save().then(() => {
        next()
      }).catch(next)
    } else {
      next({
        status: 403,
        message: 'You must provide a valid api key'
      })
    }
  }).catch(next)
}
