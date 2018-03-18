const database = require('../database')
const Sequelize = require('sequelize')
const password = require('../../services/password')

const Setting = database.define('settings', {

  identifier: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
    validate: {
      is: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      notEmpty: true
    }
  },
  value: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: false
  }
})

Setting.sync().then(() => {
  Setting.findById('admin-password').then((setting) => {
    if (!setting) {
      password.hash('!adminpassword!').then((hash) => {
        Setting.create({
          identifier: 'admin-password',
          value: hash
        })
      })
      Setting.create({
        identifier: 'default-language',
        value: 'en-US'
      })
      Setting.create({
        identifier: 'localtunnel-domain',
        value: 'googlenotificationcenter'
      })
      Setting.create({
        identifier: 'generator-base-url',
        value: null
      })
    }
  })
})

module.exports = Setting

