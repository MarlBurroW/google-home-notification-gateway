<template>
  <v-app dark>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
         
          <v-card-title primary-title>
            
             
                <v-text-field
                  label="Name"
                  v-model="name"
                  :rules="nameRules"
                  :counter="10"
                  required
                ></v-text-field>
                <v-text-field
                  label="E-mail"
                  v-model="email"
                  :rules="emailRules"
                  required
                ></v-text-field>
           
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
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
