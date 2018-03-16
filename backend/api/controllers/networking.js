const _ = require('lodash')
const helpers = require('../../helpers/helpers')
const adminAuth = require('../middlewares/adminAuth')
const axios = require('axios')

module.exports = {
  create (ApiRouter) {
    ApiRouter.post('/checkhost', adminAuth, (req, res, next) => {
      const fields = _.pick(req.body, ['ip_address'])
      axios.get(`http://${fields.ip_address}:8008/setup/eureka_info?options=detail`).then((result) => {
       
        if (result && result.data && result.data.bssid) {
          res.json({online: true, data: result.data})
        } else {
          res.json({online: false})
        }
      }).catch(() => {
        res.json({online: false})
      })
    })
  }
}
