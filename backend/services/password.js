
var bcrypt = require('bcrypt');

function hash (password) {
  return bcrypt.hash(password, 10)
}

function verify (password, hash) {
  return bcrypt.compare(password, hash)
}

module.exports = {
  hash,
  verify
}
