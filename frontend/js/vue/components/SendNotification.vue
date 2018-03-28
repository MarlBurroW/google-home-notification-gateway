<template>
    <v-dialog v-model="open" max-width="500px">
        <v-card>
          <v-card-title>
            {{title}}
          </v-card-title>
          <v-card-text >
            <v-select
              dense
              :items="languages"
              v-model="lang"
              label="Voice language"
              dense
            ></v-select>
             <v-text-field
              label="Text to speak"
              v-model="textToSpeak"
              multi-line
              no-resize
            ></v-text-field>
           
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="" flat @click.native="open = false">Close</v-btn>
            <v-btn :loading="waiting.sendNotification" color="green" flat @click.native="send()">Send</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>

</template>

<script>
// import modelPicture from '../../services/modelPicture'
// import _ from 'lodash'
// import models from '../../services/models'
import {mapActions, mapGetters} from 'vuex'
import languageService from '../../services/languages'
// import Validator from '../../classes/Validator'
// import API from '../../services/api'
// import helpers from '../../services/helpers'

export default {
  name: 'send-notification',
  mounted () {
  },
  data () {
    return {
      open: false,
      textToSpeak: null,
      lang: null,
      languages: languageService.getLanguagesForSelect()
    }
  },
  watch: {
    deviceToSendNotification (newVal, oldVal) {
      if (newVal) {
        this.lang = this.settings['default-language']
        this.textToSpeak = 'It works!'
        this.open = true
      } else {
        this.open = false
      }
    },
    open (newVal, oldVal) {
      if (!newVal) {
        this.stopSendNotification()
      }
    }
  },
  computed: {
    ...mapGetters('notifications', [
      'deviceToSendNotification',
      'waiting'
    ]),
    ...mapGetters('settings', [
      'settings'
    ]),
    title () {
      if (this.deviceToSendNotification) {
        return 'Send a voice notification to ' + this.deviceToSendNotification.name
      }
    }
  },
  methods: {
    send () {
      this.sendNotification({
        device: this.deviceToSendNotification,
        options: {
          lang: this.lang,
          text: this.textToSpeak
        }
      }).then(() => {
        this.showMessage({text: 'Notification sent', color: 'success'})
      }).catch(() => {
        this.showMessage({text: 'Error while sending notification', color: 'error'})
      })
    },
    ...mapActions('notifications', [
      'startSendNotification',
      'stopSendNotification',
      'sendNotification'
    ]),
    ...mapActions('snackbar', [
      'showMessage'
    ])
  }
}
</script>

<style lang="scss">

</style>
