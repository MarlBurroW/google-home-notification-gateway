const express = require('express')
const path = require('path')
const app = express()
const helpers = require('./helpers/view-helpers')
const api = require('./api/api.js')
const bodyParser = require('body-parser')
const localtunnel = require('localtunnel')

module.exports = {
  start () {

    // Set the template engine
    app.set('view engine', 'pug')
    app.set("views", path.join(__dirname, "views"));
    
    // Add express required middlewares
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    // Get the server port from env variable
    const port = process.env.NODE_PORT || 3020
    
    // Serve the public folder (js/css)
    app.use(express.static('public'))

    // Serve the SPA
    app.get('/', (req, res) => res.render('index'))

    // Add API routes
    api.create(app)

    // Add some views helpers
    app.locals = helpers

    // Start listening
    app.listen(port, () => console.log(`Backend is listening on port ${port}` ))

    // Expose the app publicly via localtunnel
    var tunnel = localtunnel(port, (err, tunnel) => {
      if(err) {
        console.error(err)
      } else {
        console.log(tunnel.url)
      }
    })
  }
}
