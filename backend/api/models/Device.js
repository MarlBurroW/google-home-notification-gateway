const database = require('../database')
const Sequelize = require('sequelize')

const Device = database.define('devices', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: true,  
        }
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            notEmpty: true,  
        }
    },
    ip_address: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isIPv4: true,
            notEmpty: true, 
        }
    }
})

Device.sync()

module.exports = Device