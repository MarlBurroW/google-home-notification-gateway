const _ = require('lodash')
const helpers = require('../../helpers/helpers')
const ghnotifier = require('google-home-notifier')

const Device = require('../models/Device')
const apiKeyAuth = require('../middlewares/apiKeyAuth')

module.exports = {
  create (ApiRouter) {
    ApiRouter.post('/devices/notification', apiKeyAuth, (req, res, next) => {
      const notificationFields = _.pick(req.body, ['language', 'text'])
      Device.findAll().then((devices) => {
        devices.forEach(device => {
          ghnotifier.device(device.name, notificationFields.language);
          ghnotifier.ip(device.ip_address)
          ghnotifier.notify(notificationFields.text, () => {})
        })
        res.json({
          message: 'Notification sent'
        }, 200)
      }).catch(next)
    })

    ApiRouter.post('/devices/:device_identifier/notification', apiKeyAuth, (req, res, next) => {
      const notificationFields = _.pick(req.body, ['language', 'text'])
      const deviceID = req.params.device_identifier

      Device.findById(deviceID).then((device) => {
        if (!device) {
          next({
            status: 404,
            message: 'Device not found'
          })
        } else {
          ghnotifier.device(device.name, notificationFields.language);
          ghnotifier.ip(device.ip_address)
          ghnotifier.notify(notificationFields.text, () => {})
          res.json({
            message: 'Notification sent'
          }, 200)
        }
      }).catch(next)
    })
  }
}
