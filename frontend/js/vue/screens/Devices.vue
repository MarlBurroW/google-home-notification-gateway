<template>

 <v-container grid-list-md fluid>
   <v-layout row wrap >
      <v-toolbar  style="margin-bottom: 30px;">
         <v-toolbar-title>Manage Google devices</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn :loading="waiting.getDevices" @click="getDevices()" icon>
          <v-icon>refresh</v-icon>
        </v-btn>
          <v-btn icon @click="startCreateOrEditDevice({})">
          <v-icon>add</v-icon>
        </v-btn>
      </v-toolbar>
    </v-layout>
    <v-scale-transition>
      <v-layout row wrap v-if="!waiting.getDevices">
        <v-flex  xs12 md4 lg4 v-for="device in devices" :key="device.id">
          <device-card :device="device"></device-card>   
        </v-flex>
       
      </v-layout>
     
      
    </v-scale-transition>
  
    <v-layout  justify-center align-center v-if="devices.length < 1">
      <v-flex shrink>
        <div class="no-content">Click on <v-icon>mdi-plus</v-icon> to add a device</div>
      </v-flex>
    </v-layout>
     
 </v-container>
 
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'devices',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters('global', []),
    ...mapGetters('devices', [
      'devices',
      'waiting'
    ])
  },
  methods: {
    ...mapActions('global', []),
    ...mapActions('devices', [
      'getDevices',
      'startCreateOrEditDevice'
    ])
  }
}
</script>

<style lang="scss">


</style>
