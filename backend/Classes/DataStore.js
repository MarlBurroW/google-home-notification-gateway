const fs = require('fs')

class DataStore {
  constructor (filename) {
    this.filename = filename
    this.store = {}
  }

  init () {
    if (fs.existsSync(this.filename)) {
      this.load()
    } else {
      this.store = this._defaultStore()
      this.persist()
    }
  }

  getStore () {
    return this.store
  }

  load () {
    console.log('Load from disk')
    let rawContent = fs.readFileSync(this.filename, 'utf8')
    let data = JSON.parse(rawContent)
    this.store = data
  }

  persist () {
    console.log('Write on disk')
    fs.writeFileSync(this.filename, JSON.stringify(this.store))
  }

  _defaultStore () {
    return {
      users: [
        {
          username: 'admin',
          password: 'qsdofnqsdjnfjfsvsjn'
        }
      ]
    }
  }
}

module.exports = DataStore
