const _ = require('lodash')
const helpers = require('../../helpers/helpers')
const jwt = require('jsonwebtoken');
const secret = require('../../jwt-secret')
const Setting = require('../models/Setting')
const password = require('../../services/password')

module.exports = {
  create (apiRouter) {
    apiRouter.post('/admin_tokens', (req, res, next) => {
      const fields = _.pick(req.body, ['password'])

      Setting.findById('admin-password').then((setting) => {
        let adminPassword = setting.value

        password.verify(fields.password, adminPassword).then((passwordOk) => {
          if (passwordOk) {
            const token = jwt.sign({}, secret.getSecret())
            res.json({token})
          } else {
            next({
              status: 401,
              message: 'Wrong password'
            })
          }
        }).catch(next)
      }).catch(next)
    })
  }
}
