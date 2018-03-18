<template>

 <v-container grid-list-md fluid>
   <v-layout row wrap >
      <v-toolbar  style="margin-bottom: 30px;">
        <v-toolbar-title>Manage localtunnel</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
    </v-layout>
    <v-scale-transition>
     <v-layout row wrap>
        <v-flex  xs12>
          <v-card>
            <v-card-text>
              <div>Status: {{localtunnel.status}}</div>
              <div v-if="localtunnel.url">Url: {{localtunnel.url}}</div>
              <v-btn color="success" :loading="waiting.startLocaltunnel" @click="start()" v-if="localtunnel.status === 'stopped'">Start</v-btn>
              <v-btn color="error" :loading="waiting.stopLocaltunnel" @click="stop()" v-if="localtunnel.status === 'running'">Stop</v-btn>
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
