const fs = require('fs')
let manifest = null

fs.readFile('./public/manifest.json', {encoding: 'utf-8'}, (err, data) => {
  if (!err) {
    manifest = JSON.parse(data)
  }
})

module.exports = {
  assetExist,
  asset
}

function assetExist (file) {
  return manifest[file] ? true : false
}

function asset (file) {
  return manifest[file] ? manifest[file] : ''
}
