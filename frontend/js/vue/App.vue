<template>
  <v-app dark>
    <v-layout>
      <login></login>
    </v-layout>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      loggedIn: false
    }
  }
}
</script>

<style lang="scss">


</style>
