const database = require('../database')
const Sequelize = require('sequelize')

const Device = database.define('devices', {

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
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false,
    validate: {
      notEmpty: true
    }
  },

  ip_address: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isIPv4: true,
      notEmpty: true
    }
  }
})

Device.sync()

module.exports = Device
