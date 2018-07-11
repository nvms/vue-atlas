<template>
  <div :class="classObj">
    <slot />
  </div>
</template>

<script>
import events from '../utils/events'

export default {
  name: 'VaSidebar',
  mixins: [events],
  props: {
    theme: {
      type: String,
      default: 'default',
      required: false,
      validator (v) {
        return [
          'default',
          'white',
          'blue',
          'dark',
          'darker'
        ].includes(v)
      }
    },
    compact: {
      type: Boolean,
      default: false
    },
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
    this.$on('Va@sidebarPresenceCheck', (val) => {
      this.dispatch('VaLayoutManager', 'Va@sidebarPresenceReply', true)
    })
    this.$on('Va@sidebarIsMobile', (val) => {
      if (val === true) {
        this.isMobile = true
      } else {
        this.isMobile = false
      }
    })
  },
  beforeDestroy () {
    this.dispatch('VaLayoutManager', 'Va@sidebarDisconnect', true)
  },
  computed: {
    classObj () {
      let {prefixCls, theme, compact, isMobile} = this
      let klass = {}

      klass[prefixCls + '-sidebar'] = true
      klass[prefixCls + '-sidebar--theme-' + theme] = true
      klass[prefixCls + '-sidebar-compact'] = compact
      klass[prefixCls + '-sidebar-mobile'] = isMobile

      return klass
    }
  },
  watch: {
  }
}
</script>
