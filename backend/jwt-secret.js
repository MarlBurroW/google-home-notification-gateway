const fs = require('fs')
const helpers = require('./helpers/helpers')

const secretFilePath = './backend/secret'
let secret = null

if (fs.existsSync(secretFilePath)) {
  secret = fs.readFileSync(secretFilePath, 'utf8')
} else {
  secret = helpers.generateToken(64)
  fs.writeFileSync(secretFilePath, secret, 'utf8')

}

module.exports = {
  getSecret () {
    return secret
  }   
}