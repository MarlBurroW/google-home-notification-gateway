<template>

 <v-container grid-list-md fluid>
   <v-layout row wrap >
      <v-toolbar  style="margin-bottom: 30px;">
        <v-toolbar-title>Generate Notification</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
    </v-layout>
    <v-scale-transition>
     <v-layout row wrap>
        <v-flex  xs12>
          <v-card>
            <v-card-text>
              
              <v-select
                :items="devicesSelectItems"
                v-model="device"
                label="Google device to use"
              ></v-select>
              <v-select
                :items="apiKeysSelectItems"
                v-model="apiKey"
                label="API key to use"
              ></v-select>
              <v-select
                :items="languages"
                v-model="language"
                label="Voice language to use"
              ></v-select>
              <v-select
                :items="methods"
                v-model="method"
                label="Method"
              ></v-select>
              <v-text-field
                label="Content"
                v-model="content"
                multi-line
                no-resize
              ></v-text-field>
            
            </v-card-text>
            {{notificationUrl}}
          </v-card>
        </v-flex>
      </v-layout>
    </v-scale-transition>
 </v-container>
 
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import languageService from '../../services/languages'

export default {
  name: 'settings',
  mounted () {
    this.language = this.settings['default-language']
  },
  data () {
    return {
      content: null,
      language: 'en-US',
      device: null,
      apiKey: null,
      languages: languageService.getLanguagesForSelect(),
      baseUrl: window.location.origin,
      method: 'post',
      methods: [
        {
          text: 'POST (with a JSON body)',
          value: 'post'
        },
        {
          text: 'GET (with query string parameters)',
          value: 'get'
        }
      ]
    }
  },
  watch: {
  },
  computed: {
    queryParameters () {
      let parametersStrings = []
      let parameters = []
      if (this.apiKey) {
        parameters.push({key: 'api_key', value: this.apiKey})
      }
      if (this.content) {
        parameters.push({key: 'text', value: this.content})
      }
      if (this.language) {
        parameters.push({key: 'lang', value: this.language})
      }
      if (parameters.length > 0) {
        parameters.forEach((parameter) => {
          parametersStrings.push(`${parameter.key}=${encodeURI(parameter.value)}`)
        })
        return `?${parametersStrings.join('&')}`
      } else {
        return ''
      }
    },
    notificationUrl () {
      return `${this.baseUrl}/api/devices${this.UrlDevicePart}/notifications${this.method === 'get' ? this.queryParameters : ''}`
    },
    UrlDevicePart () {
      if (!this.device) {
        return ''
      } else {
        return `/${this.device}`
      }
    },
    devicesSelectItems () {
      let items = []
      items.push({text: 'All', value: null})
      for (let deviceKey in this.devices) {
        items.push({text: this.devices[deviceKey].name, value: this.devices[deviceKey].identifier})
      }
      return items
    },
    apiKeysSelectItems () {
      let items = []
      for (let apiKeyKey in this.apiKeys) {
        items.push({text: this.apiKeys[apiKeyKey].app_name, value: this.apiKeys[apiKeyKey].token})
      }
      return items
    },
    ...mapGetters('settings', [
      'settings'
    ]),
    ...mapGetters('devices', [
      'devices'
    ]),
    ...mapGetters('apiKeys', [
      'apiKeys'
    ])
  },
  methods: {
    ...mapActions('snackbar', [
      'showMessage'
    ])
  }
}
</script>

<style lang="scss">


</style>
