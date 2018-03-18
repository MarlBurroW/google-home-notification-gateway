<template>
    <v-card >
        <v-card-title primary-title>
        <div>
            <h3 class="headline mb-0"><v-icon>mdi-key</v-icon> {{apiKey.app_name}}</h3>
            <div>Used {{apiKey.counter}} time(s)</div>
            <div>Latest use: <span v-if="apiKey.latest_use">{{apiKey.latest_use |  moment("from", "now")}}</span><span v-else>Never</span></div>
        </div>
        </v-card-title>
        <v-card-actions>
        <v-spacer></v-spacer>
          <v-btn icon @click.native="startCreateOrEditApiKey(apiKey)">
            <v-icon>edit</v-icon>
          </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'apikey-card',
  props: {
    apiKey: Object
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    ...mapActions('apiKeys', [
      'startCreateOrEditApiKey'
    ])
  },
  mounted () {
  }
}
</script>

<style lang="scss">


</style>
