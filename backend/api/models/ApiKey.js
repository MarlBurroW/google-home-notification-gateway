const database = require('../database')
const Sequelize = require('sequelize')

const ApiKey = database.define('api_keys', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    app_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: true,  
        }
    },
    token: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: true,  
        }
    }
})

ApiKey.sync()

module.exports = ApiKey