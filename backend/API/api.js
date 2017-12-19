const express = require('express')
const API = express.Router()

API.get('/', (req, res, next) => {
  let store = req.datastore.getStore()

  res.json({ message: store })
  next()
})

module.exports = API
