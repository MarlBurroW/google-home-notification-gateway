<template>

 <v-container grid-list-md fluid>
   <v-layout row wrap >
      <v-toolbar  style="margin-bottom: 30px;">
         <v-toolbar-title>Settings</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn :loading="waiting.getSettings" @click="getSettings()" icon>
          <v-icon>refresh</v-icon>
        </v-btn>
        
      </v-toolbar>
    </v-layout>
    <v-scale-transition>
     <v-layout row wrap>
        <v-flex  xs12>
          <v-card>
            <v-card-text v-if="settingsToEdit">
              <h2>Admin password</h2>
              <v-text-field
                label="Change admin password"
                type="password"
                :error-messages="validator.getErrorsText('admin-password')"
                v-model="settingsToEdit['admin-password']"
              ></v-text-field>
              <h2>Default voice language</h2>
              <p>This is the language of the voice used when the <code>lang</code> parameter is not sent in the request.</p>
              <v-select
                :items="languages"
                :error-messages="validator.getErrorsText('default-language')"
                v-model="settingsToEdit['default-language']"
                label="Default voice language"
              ></v-select>
              <h2>Change the generator base URL</h2>
              <p>The generator base URL is used to generate correct URLs in the "Generate Notification" section. it's very usefull if you use the NAT port forwarding of your router/box.</p>
              <v-text-field
                :error-messages="validator.getErrorsText('generator-base-url')"
                v-model="settingsToEdit['generator-base-url']"
                label="Generator base url "
              ></v-text-field>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :loading="waiting.updateSettings" color="green" flat @click.native="update()">Save</v-btn>
              </v-card-actions>
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
import Validator from '../../classes/Validator'
import _ from 'lodash'

export default {
  name: 'settings',
  mounted () {
    this.settingsToEdit = _.clone(this.settings)
  },
  data () {
    return {
      languages: languageService.getLanguagesForSelect(),
      validator: new Validator(),
      settingsToEdit: null
    }
  },
  watch: {
    settings (newValue, oldValue) {
      this.settingsToEdit = _.clone(newValue)
    }
  },
  computed: {
    ...mapGetters('settings', [
      'settings',
      'waiting'
    ])
  },
  methods: {
    ...mapActions('settings', [
      'getSettings',
      'updateSettings'
    ]),
    ...mapActions('snackbar', [
      'showMessage'
    ]),
    update () {
      this.updateSettings(this.settingsToEdit).then(() => {
        this.validator.reset()
        this.showMessage({text: 'Settings saved', color: 'success'})
      }).catch((response) => {
        this.showMessage({text: 'Error while saving settings', color: 'error'})
        if (response.status === 422) {
          this.validator.setErrorsFromResponse(response)
        }
      })
    }
  }
}
</script>

<style lang="scss">


</style>
