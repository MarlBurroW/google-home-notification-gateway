const _ = require('lodash')
const helpers = require('../../helpers/helpers')

const Device = require('../models/Device')
const adminAuth = require('../middlewares/adminAuth')

module.exports = {
  create (ApiRouter) {

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
						next({
							status: 404,
							message: 'Device not found'
						})
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
					next({
						status: 404,
						message: 'Device not found'
					})
				} else {
					res.json(device)
				}
			}).catch(next)
		})

		ApiRouter.delete('/devices/:device_identifier', adminAuth, (req, res, next) => {
			const deviceID = req.params.device_identifier

			Device.findById(deviceID).then((device) => {

				if (!device) {
					next({
						status: 404,
						message: 'Device not found'
					})
				} else {
					device.destroy().then(() => {
						res.json({
							message: 'device deleted'
						}, 200)
					}).catch(next)
				}
			}).catch(next)
		})

		ApiRouter.get('/devices', adminAuth, (req, res, next) => {
			Device.findAll().then((devices) => {
				res.json(devices)
			}).catch(next)
		})

		
	}
}