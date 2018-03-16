const database = require('../database')
const Sequelize = require('sequelize')

const Device = database.define('devices', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  identifier: {
    type: Sequelize.STRING,
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
  },
  model: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false,
    validate: {
      notEmpty: true,
      isIn: [['google-home', 'google-home-mini', 'google-home-copper', 'google-home-coral', 'google-home-carbon', 'google-home-mini-coral', 'google-home-mini-charcoal', 'chromecast-audio']]
    }
  }
})

Device.sync()

module.exports = Device
