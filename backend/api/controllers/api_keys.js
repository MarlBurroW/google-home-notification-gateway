const _ = require('lodash')
const helpers = require('../../helpers/helpers')

const ApiKey = require('../models/ApiKey')
const adminAuth = require('../middlewares/adminAuth')

module.exports = {
  create(ApiRouter) {

    ApiRouter.post('/api_keys', adminAuth, (req, res, next) => {
      const apiKeyFields = _.pick(req.body, ['app_name'])
      apiKeyFields.token = helpers.generateToken(32)
  
      ApiKey.create(apiKeyFields).then((apiKey) => {
        res.json(apiKey)
      }).catch(next)
    })
  
    ApiRouter.put('/api_keys/:api_key_id', adminAuth, (req, res, next) => {
      const apiKeyFields = _.pick(req.body, ['app_name', 'token'])
      const apiKeyID = req.params.api_key_id
  
      ApiKey.findById(apiKeyID).then((apiKey) => {
        apiKey.update(apiKeyFields).then((apiKey) => {
          if (!apiKey) {
            next({
              status: 404,
              message: 'Api key not found'
            })
          } else {
            res.json(apiKey)
          }
        }).catch(next)
      }).catch(next)
    })
  
    ApiRouter.get('/api_keys', adminAuth, (req, res, next) => {
      ApiKey.findAll().then((apiKeys) => {
        res.json(apiKeys)
      }).catch(next)
    })
  
    ApiRouter.get('/api_keys/:api_key_id', adminAuth, (req, res, next) => {
      const apiKeyID = req.params.api_key_id
  
      ApiKey.findById(apiKeyID).then((apiKey) => {
        if (!apiKey) {
          next({
            status: 404,
            message: 'Api key not found'
          })
        } else {
          res.json(apiKey)
        }
      }).catch(next)
    })
  
    ApiRouter.delete('/api_keys/:api_key_id', adminAuth, (req, res, next) => {
      const apiKeyID = req.params.api_key_id
  
      ApiKey.findById(apiKeyID).then((apiKey) => {
        if (!apiKey) {
          next({
            status: 404,
            message: 'Api key not found'
          })
        } else {
          apiKey.destroy().then(() => {
            res.json({
              message: 'Api key deleted'
            })
          }).catch(next)
        }
      }).catch(next)
    })
  
  }
}
