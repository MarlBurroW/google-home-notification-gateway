const express = require('express')
const path = require('path')
const app = express()
const viewHelpers = require('./helpers/view-helpers')
const helpers = require('./helpers/helpers')
const api = require('./api/api.js')
const bodyParser = require('body-parser')


module.exports = {
  start () {

    // Set the template engine
    app.set('view engine', 'pug')
    app.set("views", path.join(__dirname, "views"));
    
    // Add express required middlewares
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    // Get the server port from env variable
    const port = helpers.getApplicationPort()
    
    // Serve the public folder (js/css)
    app.use(express.static('public'))

    // Serve the SPA
    app.get('/', (req, res) => res.render('index'))

    // Add API routes
    api.create(app)

    // Add some views helpers
    app.locals = viewHelpers

    // Start listening
    app.listen(port, () => console.log(`Backend is listening on port ${port}` ))

    
  }
}
