const _ = require('lodash')
const helpers = require('../../helpers/helpers')
const adminAuth = require('../middlewares/adminAuth')
const Setting = require('../models/Setting')
const Promise = require('bluebird')
const password = require('../../services/password')

module.exports = {
  create (ApiRouter) {
    ApiRouter.put('/settings', adminAuth, (req, res, next) => {
      const settingsFields = _.pick(req.body, [
        'admin-password',
        'localtunnel-domain',
        'default-language'
      ])

      let updatePromises =  []

      for (let settingKey in settingsFields) {
        updatePromises.push(Setting.findById(settingKey).then((setting) => {
          switch (settingKey) {
            case 'admin-password':
              if (settingsFields[settingKey]) {
                password.hash(settingsFields[settingKey]).then((hash) => {
                  setting.update({value: hash}).catch(next)
                }).catch(next)
              }
              break
            default:
              setting.update({value: settingsFields[settingKey]}).catch(next)
          }
        }))
      }

      Promise.all(updatePromises).then(() => {
        Setting.findAll().then((settings) => {
          const json = {}
          for (let setting in settings) {
            if (settings[setting].identifier === 'admin-password') {
              json[settings[setting].identifier] = null
            } else {
              json[settings[setting].identifier] = settings[setting].value
            }
          }
          res.json(json)
        }).catch(next)
      })
    })

    ApiRouter.get('/settings', adminAuth, (req, res, next) => {
      Setting.findAll().then((settings) => {
        const json = {}
        for (let setting in settings) {
          if (settings[setting].identifier === 'admin-password') {
            json[settings[setting].identifier] = null
          } else {
            json[settings[setting].identifier] = settings[setting].value
          }
        }
        res.json(json)
      }).catch(next)
    })
  }
}
