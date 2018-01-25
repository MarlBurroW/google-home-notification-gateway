const DataStore = require('../Classes/DataStore.js')
const datastore = new DataStore('store')

datastore.init()

function load (req, res, next) {
  req.datastore = datastore
  console.log('load')
  next()
}

function persist (req, res, next) {
  req.datastore.persist()
  console.log('write')
  next()
}

module.exports = {load, persist}
