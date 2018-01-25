const express = require('express')
const path = require('path')
const app = express()
const helpers = require('./view-helpers')
const api = require('./api/api.js')
const bodyParser = require('body-parser');

module.exports = {
  start () {
    app.set('view engine', 'pug')
    app.set("views", path.join(__dirname, "views"));
    
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    const port = process.env.NODE_PORT || 3000
    
    app.use(express.static('public'))
    
    app.get('/', (req, res) => res.render('index'))
    

    api.create(app)

    app.locals = helpers



    app.listen(port, () => console.log(`Backend started on port ${port}` ))

   
 
    
  }
}
