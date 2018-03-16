const _ = require('lodash')
const helpers = require('../../helpers/helpers')
const ghnotifier = require('google-home-notifier')
const notifier = require('../../services/notifier')
const Device = require('../models/Device')
const apiKeyAuth = require('../middlewares/apiKeyAuth')
const apiKeyAuthOrAdminAuth = require('../middlewares/apiKeyAuthOrAdminAuth')

module.exports = {
  create (ApiRouter) {
    ApiRouter.post('/devices/notifications', apiKeyAuthOrAdminAuth, (req, res, next) => {
      const notificationFields = _.pick(req.body, ['lang', 'text'])
      const options = {}

      if (notificationFields.lang) {
        options.lang = notificationFields.lang
      }

      Device.findAll().then((devices) => {
        devices.forEach(device => {
          notifier.speak(device, notificationFields.text, options)
        })
        res.json({
          message: 'Notification sent'
        }, 200)
      }).catch(next)
    })

    ApiRouter.post('/devices/:device_identifier/notifications', apiKeyAuthOrAdminAuth, (req, res, next) => {
      const notificationFields = _.pick(req.body, ['lang', 'text'])
      const deviceID = req.params.device_identifier
      const options = {}

      if (notificationFields.lang) {
        options.lang = notificationFields.lang
      }

      Device.findById(deviceID).then((device) => {
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
    })
  }
}
