import googleHomeCarbon from '../../img/models/model-google-home-carbon.png'
import chromecastAudio from '../../img/models/model-chromecast-audio.png'
import googleHomeCopper from '../../img/models/model-google-home-copper.png'
import googleHomeCoral from '../../img/models/model-google-home-coral.png'
import googleHomeMiniCharcoal from '../../img/models/model-google-home-mini-charcoal.png'
import googleHomeMiniCoral from '../../img/models/model-google-home-mini-coral.png'
import googleHomeMini from '../../img/models/model-google-home-mini.png'
import googleHome from '../../img/models/model-google-home.png'

const modelList = [
  'google-home',
  'google-home-carbon',
  'google-home-copper',
  'google-home-coral',
  'google-home-mini',
  'google-home-mini-charcoal',
  'google-home-mini-coral',
  'chromecast-audio'
]

const modelNameMap = {
  'google-home-carbon': 'Google Home Carbon',
  'google-home-copper': 'Google Home Copper',
  'google-home-coral': 'Google Home Coral',
  'google-home-mini-charcoal': 'Google Home Mini Charcoal',
  'google-home-mini-coral': 'Google Home Mini Coral',
  'google-home-mini': 'Google Home Mini',
  'google-home': 'Google Home',
  'chromecast-audio': 'Chromecast Audio'
}

export default {
  getModelImage (device) {
    switch (device.model) {
      case 'google-home-carbon':
        return googleHomeCarbon
      case 'chromecast-audio':
        return chromecastAudio
      case 'google-home-copper':
        return googleHomeCopper
      case 'google-home-coral':
        return googleHomeCoral
      case 'google-home-mini-charcoal':
        return googleHomeMiniCharcoal
      case 'google-home-mini-coral':
        return googleHomeMiniCoral
      case 'google-home-mini':
        return googleHomeMini
      case 'google-home':
        return googleHome
      default:
        return googleHome
    }
  },
  getModelList () {
    return modelList
  },
  getModelNameMap () {
    return modelNameMap
  },
  getModelName (device) {
    let names = this.getModelNameMap()
    if (names[device.model]) {
      return names[device.model]
    } else {
      return 'Unkown model'
    }
  }
}
