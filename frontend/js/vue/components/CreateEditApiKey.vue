<template>
    <v-dialog v-model="open" max-width="500px">
        <v-card>
          <v-card-title>
            {{title}}
          </v-card-title>
          <v-card-text >
            <div v-if="apiKey">
              <v-text-field
                label="Api key name"
                placeholder="E.g. IFTTT Applets"
                :error-messages="validator.getErrorsText('app_name')"
                v-model="apiKey.app_name"
              ></v-text-field>
              <v-text-field
                v-if="edit"
                label="Key"
                :error-messages="validator.getErrorsText('token')"
                v-model="apiKey.token"
              ></v-text-field>
            </div>
           
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-btn color="" flat @click.native="open = false">Close</v-btn>
              <v-btn :loading="waiting.removeApiKey" color="red" flat v-if="edit" @click.native="remove()">Remove</v-btn>
              <v-btn :loading="waiting.createApiKey" color="green" flat v-if="!edit" @click.native="create()">Create</v-btn>
              <v-btn :loading="waiting.updateApiKey" color="green" flat v-if="edit" @click.native="update()">Save</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>

</template>

<script>

import _ from 'lodash'
// import models from '../../services/models'
import {mapActions, mapGetters} from 'vuex'
import Validator from '../../classes/Validator'
// import API from '../../services/api'
// import helpers from '../../services/helpers'

export default {
  name: 'create-edit-apikey',
  mounted () {
  },
  data () {
    return {
      open: false,
      apiKey: null,
      edit: false,
      errors: [],
      validator: new Validator()
    }
  },
  watch: {
    apiKeyToCreateOrEdit (newVal, oldVal) {
      if (newVal) {
        this.open = true
        if (newVal.id) {
          this.apiKey = _.clone(newVal)
          this.edit = true
        } else {
          this.edit = false
          this.apiKey = {
            id: null,
            app_name: null,
            token: null
          }
        }
      } else {
        this.open = false
        // Small timeout to avoid collapse effect on the dialog
        setTimeout(() => {
          this.apiKey = null
          this.edit = false
        }, 300)
      }
    },
    open (newVal, oldVal) {
      if (!newVal) {
        this.validator.reset()
        this.stopCreateOrEditApiKey()
      }
    }
  },
  computed: {
    ...mapGetters('apiKeys', [
      'apiKeyToCreateOrEdit',
      'waiting'
    ]),
    title () {
      if (this.apiKey) {
        if (this.edit) {
          return `Edit the API key ${this.apiKey.app_name}`
        } else {
          return `Create a new API key`
        }
      }
    }
  },
  methods: {
    ...mapActions('apiKeys', [
      'stopCreateOrEditApiKey',
      'updateApiKey',
      'createApiKey',
      'removeApiKey'
    ]),
    ...mapActions('snackbar', [
      'showMessage'
    ]),
    create () {
      this.createApiKey(this.apiKey).then(() => {
        this.validator.reset()
        this.open = false
        this.showMessage({text: 'API key created', color: 'success'})
      }).catch((response) => {
        this.showMessage({text: 'Error while creating the API key', color: 'error'})
        if (response.status === 422) {
          this.validator.setErrorsFromResponse(response)
        }
      })
    },
    remove () {
      this.removeApiKey(this.apiKey).then(() => {
        this.validator.reset()
        this.open = false
        this.showMessage({text: 'API key removed', color: 'success'})
      }).catch(() => {
        this.showMessage({text: 'Error while removing the API key', color: 'error'})
      })
    },
    update () {
      this.updateApiKey(this.apiKey).then(() => {
        this.validator.reset()
        this.open = false
        this.showMessage({text: 'API key saved', color: 'success'})
      }).catch((response) => {
        this.showMessage({text: 'Error while saving the API key', color: 'error'})
        if (response.status === 422) {
          this.validator.setErrorsFromResponse(response)
        }
      })
    }
  }
}
</script>

<style lang="scss">

</style>
