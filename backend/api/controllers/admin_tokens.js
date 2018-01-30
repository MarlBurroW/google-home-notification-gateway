const _ = require('lodash')
const helpers = require('../../helpers/helpers')
const jwt = require('jsonwebtoken');
const secret = require('../../jwt-secret')

const Setting = require('../models/Setting')

let adminPassword = null

Setting.findById('admin-password').then((setting) => {
  adminPassword = setting.value
})

module.exports = {
	create(apiRouter) {
		apiRouter.post('/admin_tokens', (req, res, next) => {
			const fields = _.pick(req.body, ['password'])

			if (adminPassword === fields.password) {
				const token = jwt.sign({}, secret.getSecret())
				res.json({token})
			} else {
				next({
					status: 401,
					message: 'Wrong password'
				})
			}

			
		})
	}
}