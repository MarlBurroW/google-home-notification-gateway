<template>
    <div class="custom-snackbar">
       <v-snackbar
        :timeout="6000"
        v-model="visible"
        :color="currentMessage && currentMessage.color ? currentMessage.color : null"
      >
        <span v-if="currentMessage">{{ currentMessage.text }} {{ currentMessage.key }}</span>
        <v-btn dark flat @click.native="visible = false">Close</v-btn>
      </v-snackbar>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'custom-snackbar',
  mounted () {
  },
  watch: {
    visible (newValue, oldValue) {
    },
    message (newValue, oldValue) {
      if (newValue && oldValue) {
        this.visible = false
        if (this.transitionTimeoutInstance) {
          clearTimeout(this.transitionTimeoutInstance)
        }
        this.transitionTimeoutInstance = setTimeout(() => {
          this.currentMessage = newValue
          this.visible = true
        }, 50)
      } else if (newValue && !oldValue) {
        this.currentMessage = newValue
        this.visible = true
      } else if (!newValue) {
        this.visible = false
        this.currentMessage = null
      }
    }
  },
  computed: {
    ...mapGetters('snackbar', [
      'message'
    ])
  },
  methods: {
    ...mapActions('snackbar', [
      'showMessage',
      'removeMessage'
    ])
  },
  data () {
    return {
      visible: false,
      timeout: 3000,
      currentMessage: null,
      transitionTimeoutInstance: null
    }
  }
}
</script>

<style lang="scss">

</style>
