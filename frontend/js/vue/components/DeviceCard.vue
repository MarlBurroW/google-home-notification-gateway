<template>

    <v-card>
        <v-card-media class="model-image"  height="300px" :src="modelPicture">
          
        </v-card-media>
        <v-card-title primary-title>
        <div>
          
            <h3 class="headline mb-0">{{device.name}}</h3>
            <div>{{modelName}}</div>
            <div>{{device.ip_address}}</div>
        </div>
        </v-card-title>
        <v-card-actions>
        <v-spacer></v-spacer>
          <v-btn icon @click.native="startCreateOrEditDevice(device)">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn icon @click.native="startSendNotification(device)">
            <v-icon>volume_up</v-icon>
          </v-btn>
          
        </v-card-actions>
       
    </v-card>

</template>

<script>
import models from '../../services/models'
import {mapActions} from 'vuex'

export default {
  name: 'devices',
  props: {
    device: Object
  },
  data () {
    return {
    }
  },
  computed: {
    modelPicture () {
      return models.getModelImage(this.device)
    },
    modelName () {
      return models.getModelName(this.device)
    }
  },
  methods: {
    ...mapActions('devices', [
      'startCreateOrEditDevice'
    ]),
    ...mapActions('notifications', [
      'startSendNotification'
    ])
  },
  mounted () {
  }
}
</script>

<style lang="scss">
  .model-image {
    height: 300px;
    background-color:white;
    object-fit: cover;

  }

</style>
