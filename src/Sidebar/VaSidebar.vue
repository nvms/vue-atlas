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
    compact: {
      type: Boolean,
      default: false,
      required: false
    },
    textLinks: {
      type: Boolean,
      default: false,
      required: false
    },
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
      let {prefixCls, theme, isMobile, compact, textLinks} = this
      let klass = {}

      klass[prefixCls + '-sidebar'] = true
      klass[prefixCls + '-sidebar--theme-' + theme] = true
      klass[prefixCls + '-sidebar-mobile'] = isMobile
      klass[prefixCls + '-sidebar-compact'] = compact
      klass[prefixCls + '-sidebar-text-links'] = textLinks

      return klass
    }
  },
  watch: {
  }
  // methods: {
  //   initResize (e) {
  //     /**
  //      * Prevent text selection while dragging.
  //      * https://stackoverflow.com/questions/5429827/how-can-i-prevent-text-element-selection-with-cursor-drag
  //      */
  //     if (e.stopPropagation) {
  //       e.stopPropagation()
  //     }
  //     if (e.preventDefault) {
  //       e.preventDefault()
  //     }
  //     e.cancelBubble = true
  //     e.returnValue = false

  //     window.addEventListener('mousemove', this.doResize, false)
  //     window.addEventListener('mouseup', this.stopResize, false)
  //   },
  //   doResize (e) {
  //     let el = this.$refs.sidebar
  //     this.dispatch('VaLayoutManager', 'Va@sidebarWidthChange', e.clientX - el.offsetLeft)
  //   },
  //   stopResize () {
  //     window.removeEventListener('mouseup', this.stopResize, false)
  //     window.removeEventListener('mousemove', this.doResize, false)
  //   }
  // }
}
</script>
