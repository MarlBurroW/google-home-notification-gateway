const express = require('express')
const ApiRouter = express.Router()
const database = require('./database')
const _ = require('lodash')
const ghnotifier = require('google-home-notifier')
const helpers = require('../helpers/helpers')

const Device = require('./models/Device')
const Setting = require('./models/Setting')
const ApiKey = require('./models/ApiKey')

let adminPassword = null

Setting.findById('admin-password').then((setting) => {
    adminPassword = setting.value
})


module.exports = {
    create (app) {

        

        app.use('/api', ApiRouter);

        const adminAuth = (req, res, next) => {
            console.log(req.headers)
            if(req.headers['authorization'] !== adminPassword) {
                next({status: 403, message: 'Not authorized'})
            } else {
                next()
            }
        }

        const apiKeyAuth = (req, res, next) => {
            token = req.query.api_key

            ApiKey.findOne({where: {token}}).then((api_key) => {
                if (api_key) {
                    next()
                } else {
                    next({status: 403, message: 'You must provide a valid api key'})
                }
            }).catch(next)
           
           
        }

        ApiRouter.post('/api_keys', adminAuth, (req, res, next) => {
            const apiKeyFields = _.pick(req.body, ['app_name'])
            apiKeyFields.token = helpers.generate_token(32)

            ApiKey.create(apiKeyFields).then((api_key) => {
                res.json(api_key) 
            }).catch(next)
        })

        ApiRouter.put('/api_keys/:api_key_id', adminAuth, (req, res, next) => {
            const apiKeyFields = _.pick(req.body, ['app_name', 'token'])
            const apiKeyID = req.params.api_key_id
           
            ApiKey.findById(apiKeyID).then((api_key) => {
                api_key.update(apiKeyFields).then((api_key) => {
                    if (!api_key) {
                        next({status: 404, message: 'Api key not found'})
                    } else {
                        res.json(api_key) 
                    }
                }).catch(next)  
            }).catch(next)
        })

        ApiRouter.get('/api_keys', adminAuth, (req, res, next) => {
            ApiKey.findAll().then((api_keys) => {
                res.json(api_keys) 
            }).catch(next)
        })

        ApiRouter.get('/api_keys/:api_key_id', adminAuth, (req, res, next) => {
            const apiKeyID = req.params.api_key_id
           
            ApiKey.findById(apiKeyID).then((api_key) => {
                if (!api_key) {
                    next({status: 404, message: 'Api key not found'})
                } else {
                    res.json(api_key, 200) 
                }
            }).catch(next)
        })

        ApiRouter.delete('/api_keys/:api_key_id', adminAuth, (req, res, next) => {
            const apiKeyID = req.params.api_key_id
           
            ApiKey.findById(apiKeyID).then((api_key) => {
              
                if (!api_key) {
                    next({status: 404, message: 'Api key not found'})
                } else {
                    
                    api_key.destroy().then(() => {
                        res.json({message: 'Api key deleted'}, 200) 
                    }).catch(next)
                }
            }).catch(next)
        })

        
        ApiRouter.post('/devices', adminAuth, (req, res, next) => {
            const deviceFields = _.pick(req.body, ['name', 'identifier', 'ip_address'])
            Device.create(deviceFields).then((device) => {
                res.json(device) 
            }).catch(next)
        })

        ApiRouter.put('/devices/:device_identifier', adminAuth, (req, res, next) => {
            const deviceFields = _.pick(req.body, ['name', 'identifier', 'ip_address'])
            const deviceID = req.params.device_identifier;
           
            Device.findById(deviceID).then((device) => {

                device.update(deviceFields).then((device) => {
                    if (!device) {
                        next({status: 404, message: 'Device not found'})
                    } else {
                        res.json(device) 
                    }
                   
                }).catch(next)
                
            }).catch(next)
        })

        ApiRouter.get('/devices/:device_identifier', adminAuth, (req, res, next) => {
            const deviceID = req.params.device_identifier
           
            Device.findById(deviceID).then((device) => {
                if (!device) {
                    next({status: 404, message: 'Device not found'})
                } else {
                    res.json(device) 
                }
            }).catch(next)
        })

        ApiRouter.delete('/devices/:device_identifier', adminAuth, (req, res, next) => {
            const deviceID = req.params.device_identifier
           
            Device.findById(deviceID).then((device) => {
              
                if (!device) {
                    next({status: 404, message: 'Device not found'})
                } else {
                    
                    device.destroy().then(() => {
                        res.json({message: 'device deleted'}, 200) 
                    }).catch(next)
                }
            }).catch(next)
        })

        ApiRouter.get('/devices', adminAuth, (req, res, next) => {
            Device.findAll().then((devices) => {
                res.json(devices) 
            }).catch(next)
        })

        ApiRouter.post('/devices/notification', apiKeyAuth, (req, res, next) => {
            const notificationFields = _.pick(req.body, ['language', 'text'])
            Device.findAll().then((devices) => {
                devices.forEach(device => {
                    ghnotifier.device(device.name, notificationFields.language); 
                    ghnotifier.ip(device.ip_address)
                    ghnotifier.notify(notificationFields.text, () => {})
                })
                res.json({message: 'Notification sent'} , 200) 
            }).catch(next)

        })

        ApiRouter.post('/devices/:device_identifier/notification', apiKeyAuth, (req, res, next) => {
            const notificationFields = _.pick(req.body, ['language', 'text'])
            const deviceID = req.params.device_identifier
            
            Device.findById(deviceID).then((device) => {
                if (!device) {
                    next({status: 404, message: 'Device not found'})
                } else {
                    ghnotifier.device(device.name, notificationFields.language); 
                    ghnotifier.ip(device.ip_address)
                    ghnotifier.notify(notificationFields.text, () => {})
                    res.json({message: 'Notification sent'} , 200) 
                }
               
            }).catch(next)
        })

        ApiRouter.use((err, req, res, next) => {
            res.status(err.status || 500)
                
            let jsonError = {message: 'Unkown error'}
            
            if (err.name === 'SequelizeUniqueConstraintError' || err.name === 'SequelizeValidationError') {
                res.status(err.status || 422)
                // Exclude some error data
                jsonError.validation_errors =  _.map(err.errors, item => _.pick(item, ['message', 'type', 'path', 'value', 'validatorKey']))
                jsonError.message = err.message
            } else if (err.message) {
                jsonError.message = err.message
            }

            res.json(jsonError)
        });
    }
}