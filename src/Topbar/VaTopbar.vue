<template>
  <div :class="classObj" :style="styleObj">
    <div :class="`${prefixCls}-topbar-inner`">
      <div :class="`${prefixCls}-topbar-left`">
        <slot name="left"/>
      </div>
      <div :class="`${prefixCls}-topbar-center`">
        <slot name="center"/>
      </div>
      <div :class="`${prefixCls}-topbar-right`">
        <slot name="right"/>
      </div>
    </div>
  </div>
</template>

<script>
import events from '../utils/events'

export default {
  name: 'VaTopbar',
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
          'darker',
          'purple'
        ]
      }
    },
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  data () {
    return {
      currentTopbarHeight: 0,
      isMobile: false
    }
  },
  created () {
    this.$on('Va@topbarPresenceCheck', (val) => {
      this.dispatch('VaLayoutManager', 'Va@topbarPresenceReply', true)
    })
    this.$on('Va@topbarHeightChange', (val) => {
      this.currentTopbarHeight = val
    })
    this.$on('Va@topbarIsMobile', (val) => {
      if (val === true) {
        this.isMobile = true
      } else {
        this.isMobile = false
      }
    })
  },
  beforeDestroy () {
    this.dispatch('VaLayoutManager', 'Va@topbarDisconnect', true)
  },
  computed: {
    classObj () {
      let {prefixCls, theme} = this
      let klass = {}

      klass[prefixCls + '-topbar'] = true
      klass[prefixCls + '-topbar--theme-' + theme] = true

      return klass
    },
    styleObj () {
      let topHeight = parseInt(this.currentTopbarHeight)
      let style = {}

      style['height'] = topHeight + 'px'

      // Less than 40 and we don't want overflow.
      // Greater than 40 and we do, because we don't want
      // to hide dropdown menus.

      // Dropdown menus in the topbar won't appear when the
      // topbar has a height of less than 40px.

      // In normal use, it should never be below 40px anyways.
      if (topHeight < 40) {
        style['overflow'] = 'hidden'
      } else {
        style['overflow'] = 'visible'
      }

      return style
    }
  }
}
</script>
