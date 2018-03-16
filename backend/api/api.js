const express = require('express')
const ApiRouter = express.Router()
const _ = require('lodash')
const ghnotifier = require('google-home-notifier')

const errorHandler = require('./errorHandler')
const devicesController = require('./controllers/devices')
const apiKeysController = require('./controllers/apikeys')
const adminTokensController = require('./controllers/admin_tokens')
const notificationsController = require('./controllers/notifications')
const localtunnelController = require('./controllers/localtunnel')
const networkingController = require('./controllers/networking')
const settingsController = require('./controllers/settings')

module.exports = {
  create (app) {
    app.use('/api', ApiRouter)

    devicesController.create(ApiRouter)
    apiKeysController.create(ApiRouter)
    notificationsController.create(ApiRouter)
    adminTokensController.create(ApiRouter)
    localtunnelController.create(ApiRouter)
    networkingController.create(ApiRouter)
    settingsController.create(ApiRouter)
    ApiRouter.use(errorHandler)
  }
}