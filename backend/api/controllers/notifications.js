const _ = require('lodash')
const helpers = require('../../helpers/helpers')
const ghnotifier = require('google-home-notifier')
const notifier = require('../../services/notifier')
const Device = require('../models/Device')
const apiKeyAuth = require('../middlewares/apiKeyAuth')
const apiKeyAuthOrAdminAuth = require('../middlewares/apiKeyAuthOrAdminAuth')
const mergeParams = require('../middlewares/mergeParams')
const Promise = require('bluebird')

const NotificationToASingleDevice =  (req, res, next) => {
  const notificationFields = _.pick(req.mergedParams, ['device_identifier', 'lang', 'text'])

  if (!notificationFields.text) {
    next(new Error('Text missing'))
  }

  isId = /^\d+$/.test(notificationFields.device_identifier)
  if (isId) {
    whereTerm = {id: notificationFields.device_identifier}
  } else {
    whereTerm = {identifier: notificationFields.device_identifier}
  }

  const options = {}

  if (notificationFields.lang) {
    options.lang = notificationFields.lang
  }

  Device.findOne({where: whereTerm}).then((device) => {
    if (!device) {
      next({
        status: 404,
        message: 'Device not found'
      })
    } else {
      notifier.speak(device, notificationFields.text, options).then(() => {
        res.json({
          message: 'Notification sent'
        }, 200)
      }).catch(next)
    }
  }).catch(next)
}

const NotificationToAllDevices = (req, res, next) => {
  const notificationFields = _.pick(req.mergedParams, ['device_identifier', 'lang', 'text'])
  const options = {}

  if (notificationFields.lang) {
    options.lang = notificationFields.lang
  }

  Device.findAll().then((devices) => {
    let promises = []
    devices.forEach(device => {
      promises.push(notifier.speak(device, notificationFields.text, options))
    })

    Promise.all(promises).then(() => {
      res.json({
        message: 'Notification sent'
      }, 200)
    }).catch(() => {
      next(new Error('At least one device failed to send notification'))
    })
  }).catch(next)
}

module.exports = {
  create (ApiRouter) {
    ApiRouter.post('/devices/notifications', mergeParams, apiKeyAuthOrAdminAuth, NotificationToAllDevices)
    ApiRouter.post('/devices/:device_identifier/notifications', mergeParams, apiKeyAuthOrAdminAuth, NotificationToASingleDevice)
    ApiRouter.get('/devices/notifications', mergeParams, apiKeyAuthOrAdminAuth, NotificationToAllDevices)
    ApiRouter.get('/devices/:device_identifier/notifications', mergeParams, apiKeyAuthOrAdminAuth, NotificationToASingleDevice)
  }
}
