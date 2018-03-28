<template>
 <v-container grid-list-md fluid>
   <v-layout row wrap>
      <v-toolbar  style="margin-bottom: 30px;">
        <v-toolbar-title>Manage API keys</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn :loading="waiting.getApiKeys" @click="getApiKeys()" icon>
          <v-icon>refresh</v-icon>
        </v-btn>
        </v-btn>
          <v-btn icon @click="startCreateOrEditApiKey({})">
          <v-icon>add</v-icon>
        </v-btn>
      </v-toolbar>
    </v-layout>
    <v-scale-transition>
      <v-layout row wrap v-if="!waiting.getApiKeys">
         <v-flex  xs12 md4 lg4 v-for="apiKey in apiKeys" :key="apiKey.id">
          <apikey-card :api-key="apiKey"></apikey-card>   
        </v-flex>
      </v-layout>
    </v-scale-transition>
    <v-layout  justify-center align-center v-if="apiKeys.length < 1">
      <v-flex shrink>
        <div class="no-content">Click on <v-icon>mdi-plus</v-icon> to add an API key</div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'apikeys',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('apiKeys', [
      'apiKeys',
      'waiting'
    ])
  },
  methods: {
    ...mapActions('apiKeys', [
      'getApiKeys',
      'startCreateOrEditApiKey',
      'stopCreateOrEditApiKey',
      'updateDevice',
      'createDevice',
      'removeDevice'
    ])
  },
  mounted () {
  }
}
</script>

<style lang="scss">


</style>
