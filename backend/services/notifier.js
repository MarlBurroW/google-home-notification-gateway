const ghnotifier = require('google-home-notifier')
const Setting = require('../api/models/Setting')
const Promise = require('bluebird')
const axios = require('axios')



function speak (device, text, options) {
  let promises = []

  if (!options) {
    options = {}
  }

  if (!options.lang) {
    promises.push(Setting.findOne({identifier: 'default-language'}).then((defaultLanguageSetting) => {
      options.lang = defaultLanguageSetting.value
    }))
  }

  return Promise.all(promises).then(() => {
    ghnotifier.device(device.name, options.lang)
    ghnotifier.ip(device.ip_address)
    return new Promise((resolve, reject) => {
      ghnotifier.notify(text, (result) => {
        if (result === "error") {
          reject(new Error('Notification failed'))
        } else {
          resolve()
        }
      })
    })
  })
}

module.exports = {
  speak
}
