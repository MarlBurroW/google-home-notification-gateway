<template>
  <v-layout>
    <v-navigation-drawer
      clipped
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile  to="generate-notification">
          <v-list-tile-action>
            <v-icon>info</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>How to use</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="devices">
          <v-list-tile-action>
            <v-icon>mdi-google-home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Devices</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="apikeys">
          <v-list-tile-action>
            <v-icon>mdi-key</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>API Keys</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="localtunnel">
          <v-list-tile-action>
            <v-icon>mdi-key</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Localtunnel</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="settings">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile @click="logout()">
          <v-list-tile-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Google Home Notification Gateway</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-fade-transition mode="out-in">
          <router-view></router-view>
        </v-fade-transition>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <v-spacer></v-spacer><span>Made with ❤️ by marlburrow &nbsp;</span>
    </v-footer>
   
   
  
  </v-layout>
 
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    drawer: null,
    test: true
  }),
  props: {
    source: String
  },
  methods: {
    ...mapActions('global', [
      'logout'
    ])
  }
}
</script>