const _ = require('lodash')
const helpers = require('../../helpers/helpers')
const adminAuth = require('../middlewares/adminAuth')
const localtunnel = require('../../services/localtunnel')

module.exports = {
  create (ApiRouter) {
    ApiRouter.post('/localtunnel', adminAuth, (req, res, next) => {

      localtunnel.start().then((instance) => {
        res.json(localtunnel.getStatus())
      }).catch((err) => {
        next({status: 500, message: err})
      })
    })

    ApiRouter.delete('/localtunnel', adminAuth, (req, res, next) => {
      const instance = localtunnel.getCurrentInstance()
      if (!instance) {
        res.json(localtunnel.getStatus())
      } else {
        localtunnel.stop()
        res.json(localtunnel.getStatus())
      }
    })

    ApiRouter.get('/localtunnel', adminAuth, (req, res, next) => {
      res.json(localtunnel.getStatus())
    })
  }
}
