const express = require('express')
const ApiRouter = express.Router()
const database = require('./database')
const Device = require('./models/Device')
const _ = require('lodash')
const ghnotifier = require('google-home-notifier');

module.exports = {
    create (app) {

        ApiRouter.post('/devices', (req, res) => {
            const deviceFields = _.pick(req.body, ['name', 'slug', 'ip_address'])
            Device.create(deviceFields).then((device) => {
                res.json(device) 
            }).catch((error) => {
                res.json(error, 422) 
            })
        })

        ApiRouter.put('/devices/:device_id', (req, res) => {
            const deviceFields = _.pick(req.body, ['name', 'slug', 'ip_address'])
            const deviceID = req.params.device_id;
           
            Device.findById(deviceID).then((device) => {

                device.update(deviceFields).then((device) => {
                    res.json(device) 
                }).catch((error) => {
                    res.json(error, 422) 
                })
                
            }).catch((error) => {
                res.json(error, 404) 
            })
        })

        ApiRouter.get('/devices/:device_id', (req, res) => {
            const deviceID = req.params.device_id
           
            Device.findById(deviceID).then((device) => {
                
                res.json(device) 
            }).catch((error) => {
                res.json({message: "device not found"}, 404) 
            })
        })

        ApiRouter.delete('/devices/:device_id', (req, res) => {
            const deviceID = req.params.device_id
           
            Device.findById(deviceID).then((device) => {
                device.destroy().then(() => {
                    res.json({message: "device deleted"}, 200) 
                }).catch((error) => {
                    res.json(error, 500) 
                })
                
            }).catch((error) => {
                res.json({message: "device not found"}, 404) 
            })
        })

        ApiRouter.get('/devices', (req, res) => {
            Device.findAll().then((devices) => {
                res.json(devices) 
            }).catch((error) => {
                res.json(error, 500) 
            })
        })

        ApiRouter.post('/devices/:device_id/notification', (req, res) => {
            const notificationFields = _.pick(req.body, ['language', 'text'])
            const deviceID = req.params.device_id
            
            Device.findById(deviceID).then((device) => {
                ghnotifier.device(device.name, notificationFields.language); 
                ghnotifier.ip(device.ip_address)
               
                ghnotifier.notify(notificationFields.text, () => {

                })

                res.json({message: "Notification sent"} , 200) 

            }).catch((error) => {
                res.json({message: error}, 500) 
            })
        })

        app.use('/api', ApiRouter);
    }
}