const express = require('express')
const path = require('path')
const app = express()
const helpers = require('./view-helpers')
const {load, persist} = require('./middlewares/persistence.js')
const API = require('./API/api.js')
const port = process.env.NODE_PORT || 3000

module.exports = {
  start () {
    // Set the template engine
    app.set('view engine', 'pug')

    // Set the template path
    app.set('views', path.join(__dirname, 'views'))

    // Serve the static assets
    app.use(express.static('public'))

    // Serve the SPA
    app.get('/', (req, res) => res.render('index'))

    // Add View Helpers to the app
    app.locals = helpers

    // Create the API endpoint
    app.use('/api', load, API, persist)

    // Start listening
    app.listen(port, () => console.log(`Backend is listening on port ${port}` ))
  }
}
