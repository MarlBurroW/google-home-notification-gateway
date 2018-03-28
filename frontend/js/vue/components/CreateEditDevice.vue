<template>
    <v-dialog scrollable v-model="open" max-width="500px">
        <v-card>
          <v-card-media v-if="device" class="model-image"  height="200px" :src="modelPicture">
          </v-card-media>
        
          <v-card-text >
            <div v-if="device">
              <v-text-field
                :append-icon="checkingHost ? '' : (hostOnline ? 'check' : 'close')"
                :error-messages="validator.getErrorsText('ip_address')"
                v-on:input="checkHost"
                :loading="checkingHost"
                v-model="device.ip_address"
                :label="`IP Address ${this.hostInfo ? '(' + this.hostInfo + ')' : ''}`"       
              ></v-text-field>
              <v-text-field
                :error-messages="validator.getErrorsText('name')"
                v-model="device.name"
                label="Name"
              ></v-text-field>
                <v-text-field
                :error-messages="validator.getErrorsText('identifier')"
                v-model="device.identifier"
                label="Identifier"
              ></v-text-field>
              <v-select
                :error-messages="validator.getErrorsText('model')"
                :items="modelList"
                v-model="device.model"
                label="Model"
              ></v-select>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="" flat @click.native="open = false">Close</v-btn>
              <v-btn :loading="waiting.removeDevice" color="red" flat v-if="edit" @click.native="remove()">Remove</v-btn>
              <v-btn :loading="waiting.createDevice" color="green" flat v-if="!edit" @click.native="create()">Create</v-btn>
              <v-btn :loading="waiting.updateDevice" color="green" flat v-if="edit" @click.native="update()">Save</v-btn>
          </v-card-actions>
         
        </v-card>
    </v-dialog>

</template>

<script>
// import modelPicture from '../../services/modelPicture'
import _ from 'lodash'
import models from '../../services/models'
import {mapActions, mapGetters} from 'vuex'
import Validator from '../../classes/Validator'
import API from '../../services/api'
import helpers from '../../services/helpers'

export default {
  name: 'create-edit-device',
  mounted () {
  },
  data () {
    return {
      edit: false,
      open: false,
      device: null,
      deviceData: null,
      errors: [],
      validator: new Validator(),
      checkingHost: false,
      hostOnline: false
    }
  },
  watch: {
    deviceToCreateOrEdit (newVal, oldVal) {
      if (newVal) {
        this.open = true
        this.checkingHost = false
        this.hostOnline = false
        this.deviceData = null

        if (newVal.identifier) {
          this.device = _.clone(newVal)
          this.edit = true
          this.checkHost()
        } else {
          this.edit = false
          this.device = {
            identifier: null,
            name: null,
            ip_address: null,
            model: models.getModelList()[0]
          }
        }
      } else {
        this.edit = false
        // Small timeout to avoid collapse effect on the dialog
        setTimeout(() => {
          this.device = null
          this.edit = false
        }, 300)
      }
    },
    open (newVal, oldVal) {
      if (!newVal) {
        this.validator.reset()
        this.stopCreateOrEditDevice()
      }
    }
  },
  computed: {
    ...mapGetters('devices', [
      'deviceToCreateOrEdit',
      'waiting'
    ]),
    hostInfo () {
      if (!this.device.ip_address) {
        return ``
      } else if (this.checkingHost) {
        return `Checking Google device signature...`
      } else if (this.hostOnline && this.deviceData) {
        return `${this.deviceData.name}`
      } else {
        return `Offline or not a google device`
      }
    },
    modelList () {
      let modelList = []
      let modelNameMap = models.getModelNameMap()
      for (let model in modelNameMap) {
        modelList.push({text: modelNameMap[model], value: model})
      }
      return modelList
    },
    modelPicture () {
      return models.getModelImage(this.device)
    }
  },
  methods: {
    ...mapActions('devices', [
      'stopCreateOrEditDevice',
      'updateDevice',
      'createDevice',
      'removeDevice'
    ]),
    ...mapActions('snackbar', [
      'showMessage'
    ]),
    checkHost: _.debounce(function () {
      this.checkingHost = true
      console.log(this.device.ip_address)
      API.takeLatest('check-host', API.checkHost(this.device.ip_address)).then((result) => {
        this.hostOnline = result.online
        if (result.online) {
          this.deviceData = result.data
          if (!this.edit) {
            this.device.name = this.deviceData.name
            this.device.identifier = helpers.slugify(this.deviceData.name)
          }
        } else {
          this.deviceData = null
        }
      }).finally(() => {
        this.checkingHost = false
      })
    }, 500),
    create () {
      this.createDevice(this.device).then(() => {
        this.validator.reset()
        this.open = false
        this.showMessage({text: 'Device created', color: 'success'})
      }).catch((apiError) => {
        this.showMessage({text: 'Error while creating the device', color: 'error'})
        if (apiError.isValidationError()) {
          this.validator.setErrorsFromResponse(apiError.getResponse())
        }
      })
    },
    remove () {
      this.removeDevice(this.device).then(() => {
        this.validator.reset()
        this.open = false
        this.showMessage({text: 'Device removed', color: 'success'})
      }).catch(() => {
        this.showMessage({text: 'Error while removing the device', color: 'error'})
      })
    },
    update () {
      this.updateDevice(this.device).then(() => {
        this.validator.reset()
        this.open = false
        this.showMessage({text: 'Device saved', color: 'success'})
      }).catch((response) => {
        this.showMessage({text: 'Error while saving the device', color: 'error'})
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
