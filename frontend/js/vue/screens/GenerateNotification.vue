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
        <v-flex  xs12 md5>
          <v-card>
            <v-card-text>
              <h1>Compose the request</h1>
              <v-alert v-if="errors.length > 0" type="error" :value="true" class="instructions-alert">
                <div v-for="error in errors">• {{error}}</div>
              </v-alert>
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
            
          </v-card>
        </v-flex>
         <v-flex  xs12 md7>
          <v-card>
            <v-card-text>
              <h1>How to send the request</h1>
              <p v-if="method === 'get'">Call the url below with a simple <code color="success">GET</code> method to trigger the notification:</p>
              <p v-if="method === 'post'">To trigger the notification with the <code color="success">POST</code> method, you have to call the below url with the <code>POST</code> method and add the <code>Content-Type</code> header with the value <code>application/json</code></p>
          
              <prism language="bash">{{notificationUrl}}</prism>
              <p v-if="method === 'post'">All parameters must be located in the request body with the following JSON content:</p>
              <prism v-if="method === 'post'" language="json">{{this.formattedJsonParameters}}</prism>
             
              <h2>Test with cURL</h2>
              <p>You can test the notification with the following cURL command</p>
              <prism language="bash">{{curlCommand}}</prism>


            </v-card-text>
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
      method: 'get',
      methods: [
        {
          text: 'GET - Query string parameters',
          value: 'get'
        },
        {
          text: 'POST - JSON formatted parameters in the request body',
          value: 'post'
        }
      ]
    }
  },
  watch: {
  },
  computed: {
    baseUrl () {
      if (this.settings && this.settings['generator-base-url']) {
        return this.settings['generator-base-url'].replace(/\/$/, '')
      } else {
        return window.location.origin
      }
    },
    curlCommand () {
      if (this.method === 'get') {
        return `curl "${this.notificationUrl}"`
      } else {
        return `curl -H "Content-Type: application/json" -X POST -d '${this.jsonParameters}' "${this.notificationUrl}"`
      }
    },
    errors () {
      let errors = []
      if (!this.apiKey) {
        errors.push('You have to select an API key. If you don\'t have any API key yet, you have to create one in the API Keys section.')
      }
      if (!this.content) {
        errors.push('You have to write the content of the notification')
      }
      return errors
    },
    formattedJsonParameters () {
      let parameters = {}
      this.parameters.forEach((parameter) => {
        parameters[parameter.key] = parameter.value
      })
      return JSON.stringify(parameters, null, 2)
    },
    jsonParameters () {
      let parameters = {}
      this.parameters.forEach((parameter) => {
        parameters[parameter.key] = parameter.value
      })
      return JSON.stringify(parameters)
    },
    parameters () {
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
      return parameters
    },
    queryParameters () {
      let parametersStrings = []
      let parameters = this.parameters
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
.instructions-alert {
  margin-bottom: 20px;
}

code[class*="language-"] {
    &::before {
      content: none
    }
}

pre[class*="language-"] {
  border: none;
  margin-bottom: 20px;
}

code[class*="language-"]  {
  box-shadow: none;

  background: none;
}
</style>
