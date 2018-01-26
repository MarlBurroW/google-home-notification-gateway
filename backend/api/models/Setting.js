const database = require('../database')
const Sequelize = require('sequelize')

const Setting = database.define('settings', {
   
    identifier: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        validate: {
            is: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            notEmpty: true,  
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
        if(!setting) {
            Setting.create({
                identifier: 'admin-password',
                value: '!adminpassword!'
            })
        }
    })
    

})

module.exports = Setting