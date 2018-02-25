const localtunnel = require('localtunnel')
const Promise = require('bluebird')
const helpers = require('../helpers/helpers')
const port = helpers.getApplicationPort()
const Setting = require('../api/models/Setting')

let localtunnelInstance = null
let localTunnelDomain = null

module.exports = {
  start,
  stop,
  getCurrentInstance,
  getStatus
}

function start () {
  return new Promise(function (resolve, reject) {

    if (localtunnelInstance) {
      reject('localtunnel already running')
    } else {
      Setting.findOne({where: {
        identifier: 'localtunnel-domain'
      }}).then((setting) => {
        localTunnelDomain = setting.value
        localtunnel(port, {subdomain: localTunnelDomain}, (err, tunnel) => {
          if (err) {
            reject(err)
          } else {
            localtunnelInstance = tunnel

            console.log('Localtunnel started: ', localtunnelInstance.url)
            localtunnelInstance.on('error', (err) => {
              console.error('Localtunnel crashed')
              console.log('Localtunnel restarting...')
              localtunnelInstance = null
              start()
            })
            resolve(localtunnelInstance)
          }
        })
      }).catch(reject) 
    }
  })
}

function stop () {
  localtunnelInstance.close()
  localtunnelInstance = null

}

function getCurrentInstance () {
  return localtunnelInstance
}

function getStatus () {
  if(!localtunnelInstance) {
    return {
      status: "stopped",
      url: null
    }
  } else {
    return {
      status: "running",
      url: localtunnelInstance.url
    }
  }
}
