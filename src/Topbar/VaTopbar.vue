<template>
  <div :class="classObj" :style="styleObj">
    <div :class="`${prefixCls}-topbar-inner`">
      <div :class="`${prefixCls}-topbar-left`">
        <va-button
          v-if="isMobile"
          type="primary-dark"
          round
          style="float:left;"
          @click.native="showMobileSidebar">
          <va-icon type="bars" color="white"></va-icon>
        </va-button>
        <slot name="left"/>
      </div>
      <div :class="`${prefixCls}-topbar-right`">
        <slot name="right"/>
      </div>
    </div>
    <va-aside
      v-if="isMobile"
      ref="aside"
      placement="left"
      :width="300">
      <va-bars>
        <va-minibar
          theme="default"
          :top-items="minibarTopItems">
        </va-minibar>
        <va-sidebar theme="default">
          <va-sidebar-group
            :items="sidebarItems"
            title="Navigation"
            style="margin-top:18px;"
            :default-open-level="1"/>
        </va-sidebar>
      </va-bars>
    </va-aside>
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
          'darker'
        ]
      }
    },
    sidebarItems: {
      type: Array,
      required: false
    },
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  data () {
    return {
      currentTopbarHeight: 0,
      isMobile: false,
      minibarTopItems: [
        {
          icon: 'arrow-left',
          size: '1.25em',
          method: this.closeMobileSidebar
        }
      ]
    }
  },
  created () {
    this.$on('Va@topbarPresenceCheck', (val) => {
      this.dispatch('VaLayoutManager', 'Va@topbarPresenceReply', true)
    })
    this.$on('Va@topbarHeightChange', (val) => {
      this.currentTopbarHeight = val
      console.log('Topbar received currentTopbarHeight', this.currentTopbarHeight)
    })
    this.$on('Va@topbarIsMobile', (val) => {
      if (val === true) {
        // this.isMobile = true
      }
    })
  },
  beforeDestroy () {
    this.dispatch('VaLayoutManager', 'Va@topbarDisconnect', true)
  },
  methods: {
    showMobileSidebar () {
      this.$refs.aside.open()
    },
    closeMobileSidebar () {
      this.$refs.aside.close()
    }
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
