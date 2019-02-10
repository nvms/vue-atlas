<template>
  <div>
    <slot v-if="!isMobile"/>
  </div>
</template>

<script>
import events from '../utils/events'

export default {
  name: 'VaDesktop',
  mixins: [events],
  props: {
    classPrefix: {
      type: String,
      default: 'va'
    }
  },
  data () {
    return {
      isMobile: false
    }
  },
  created () {
    this.$on('Va@desktopIsMobile', (val) => { this.isMobile = val })

    /**
     * In case this component is instantiated after the App
     * has initially broadcasted isMobile, let's request it.
     */
    this.dispatch('VaApp', 'Va@requestIsMobile', true)
  }
}
</script>
