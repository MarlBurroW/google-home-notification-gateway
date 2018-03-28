<template>
    <div>
      <v-dialog persistent v-model="loginDialog" max-width="500px">
        <v-form @submit="logIn()">
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
            <v-btn :loading="waiting.login" type="submit" round color="primary" >Login</v-btn>
            <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-form>
        
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
      password: ''
    }
  },
  computed: {
    ...mapGetters('global', [
      'waiting'
    ])
  },
  methods: {
    logIn () {
      this.login(this.password).then(() => {
        this.showMessage({text: 'Logged In', color: 'success'})
      }).catch((apiError) => {
        if (apiError.isUnauthorized) {
          this.showMessage({text: 'Wrong password', color: 'error'})
        } else {
          this.showMessage({text: apiError.message, color: 'error'})
        }
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
