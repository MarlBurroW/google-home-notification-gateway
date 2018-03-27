<template>

 <v-container grid-list-md fluid>
   <v-layout row wrap >
      <v-toolbar  style="margin-bottom: 30px;">
        <v-toolbar-title>Manage localtunnel</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
    </v-layout>
    <v-alert type="info" :value="true">
      The localtunnel feature expose the notification API to internet without any configuration needed on your router.
    </v-alert>
    <v-alert type="warning" :value="true">
      In the current version, the localtunnel is not stable over time. However, it's very helpful if you only want to test GHNG without configure port forwarding on your router.
    </v-alert>
    <v-scale-transition>
     <v-layout row wrap>
        <v-flex  xs12>
          
          <v-card>
            <v-card-text>
              <v-flex>
                 <v-chip :color="localtunnel.status === 'running' ? 'success' : 'error'" text-color="white">Status: {{localtunnel.status}}</v-chip>
              </v-flex>
              <v-flex>
                <v-chip  color="teal" text-color="white">
                  <v-avatar>
                    <v-icon>mdi-earth</v-icon>
                  </v-avatar>
                  Url: {{localtunnel.status === 'running' ? localtunnel.url : 'Localtunnel not started'}}
                </v-chip>
              </v-flex>
              
             
              <v-btn color="success" :loading="waiting.startLocaltunnel" @click="start()" v-if="localtunnel.status === 'stopped'">Start Localtunnel</v-btn>
              <v-btn color="error" :loading="waiting.stopLocaltunnel" @click="stop()" v-if="localtunnel.status === 'running'">Stop Localtunnel</v-btn>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-scale-transition>
    
  
 </v-container>
 
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'localtunnel',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters('localtunnel', [
      'localtunnel',
      'waiting'
    ])
  },
  methods: {
    start () {
      this.startLocaltunnel().then(() => {
        this.showMessage({text: 'Tunnel started', color: 'success'})
      }).catch(() => {
        this.showMessage({text: 'Tunnel starting failed', color: 'error'})
      })
    },
    stop () {
      this.stopLocaltunnel().then(() => {
        this.showMessage({text: 'Tunnel stopped', color: 'success'})
      }).catch(() => {
        this.showMessage({text: 'Tunnel stopping failed', color: 'error'})
      })
    },
    ...mapActions('snackbar', [
      'showMessage'
    ]),
    ...mapActions('localtunnel', [
      'getLocaltunnel',
      'startLocaltunnel',
      'stopLocaltunnel'
    ])
  }
}
</script>

<style lang="scss">


</style>
