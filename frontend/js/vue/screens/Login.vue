<template>
    <div>
      <v-dialog persistent v-model="loginDialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Administration</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
            label="Admin password"
            v-model="password"
            required
            type="password"
            :loading="waiting.login"
            ></v-text-field>
                  
          </v-card-text>
          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :loading="waiting.login" @click="logIn()" round color="primary" >Login</v-btn>
          <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      loginDialog: true,
      password: '!adminpassword!'
    }
  },
  computed: {
    ...mapGetters('global', [
      'loggedIn',
      'waiting'
    ])
  },
  methods: {
    logIn () {
      this.login(this.password).then(() => {
        this.showMessage({text: 'Logged In', color: 'success'})
      }).catch((response) => {
        this.showMessage({text: response.data.message, color: 'error'})
      })
    },
    ...mapActions('global', [
      'login'
    ]),
    ...mapActions('snackbar', [
      'showMessage'
    ]),
    onSuccess (data) {

    }
  },
  mounted () {
  }
}
</script>

<style lang="scss">


</style>
