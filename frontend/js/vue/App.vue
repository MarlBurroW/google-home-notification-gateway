<template>
  <v-app dark>
    <v-layout >
      <login v-if="!loggedIn"></login>
      <layout v-if="loggedIn"></layout>
    </v-layout>
    
    <create-edit-device></create-edit-device>
    <create-edit-apikey></create-edit-apikey>
    <send-notification></send-notification>
    <custom-snackbar></custom-snackbar>
  </v-app>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'app',
  mounted () {
  },
  computed: {
    ...mapGetters('global', [
      'loggedIn'
    ]),
    ...mapGetters('devices', [
      'deviceToCreateOrEdit'
    ])
  },
  methods: {
    ...mapActions('devices', [
    ])
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss">


</style>
