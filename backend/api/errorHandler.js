const _ = require('lodash')

module.exports = (err, req, res, next) => {
	res.status(err.status || 500)
	let jsonError = {
		message: 'Unkown error'
	}

	if (err.name === 'SequelizeUniqueConstraintError' || err.name === 'SequelizeValidationError') {
		res.status(err.status || 422)
		// Exclude some error data
		jsonError.validation_errors = _.map(err.errors, item => _.pick(item, ['message', 'type', 'path', 'value', 'validatorKey']))
		jsonError.message = err.message
	} else if (err.message) {
		jsonError.message = err.message
	}

	res.json(jsonError)
}