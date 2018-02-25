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
              ></v-text-field>
                    
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="login(password)" round color="primary" >Login</v-btn>
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
  watch: {
    loggedIn (newVal, oldVal) {
      this.loginDialog = !newVal
    }
  },
  data () {
    return {
      loginDialog: true,
      password: null
    }
  },
  computed: {
    ...mapGetters('global', [
      'loggedIn'
    ])
  },
  methods: {
    ...mapActions('global', [
      'login'
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
