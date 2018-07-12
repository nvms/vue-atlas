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
    prefixCls: {
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
    this.$on('Va@desktopIsMobile', (val) => {
      this.isMobile = val
    })

    /**
     * In case this component is instantiated after the LayoutManager
     * has initially broadcasted isMobile, let's request it.
     */
    this.dispatch('VaLayoutManager', 'Va@requestIsMobile', true)
  }
}
</script>
