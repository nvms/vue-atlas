<template>
  <div :class="classObj" :style="styleObj">
    <div :class="`va-minibar-inner`" :style="styleObjInner">

      <div :class="`va-minibar-top`">
        <slot name="top">
          <div v-for="(item, index) in topItems" :key="index">
            <va-minibar-item
              v-if="item.method"
              :tooltip="item.tooltip"
              :brand="item.brand"
              @click.native="item.method"
            >
              <va-icon
                :type="item.icon"
                :size="item.size"
                :icon-style="item.iconStyle || 'solid'"
              />
            </va-minibar-item>
            <va-minibar-item v-else :brand="item.brand" :tooltip="item.tooltip">
              <va-icon
                :type="item.icon"
                :size="item.size"
                :icon-style="item.iconStyle || 'solid'"
              />
            </va-minibar-item>
          </div>
        </slot>
      </div>

      <div :class="`va-minibar-bottom`">
        <slot name="bottom">
          <div v-for="(item, index) in bottomItems" :key="index">
            <va-minibar-item
              v-if="item.method"
              @click.native="item.method"
              :tooltip="item.tooltip"
            >
              <va-icon
                :type="item.icon"
                :size="item.size"
                :icon-style="item.iconStyle || 'solid'"
              />
            </va-minibar-item>
            <va-minibar-item v-else :tooltip="item.tooltip">
              <va-icon
                :type="item.icon"
                :size="item.size"
                :icon-style="item.iconStyle || 'solid'"
              />
            </va-minibar-item>
          </div>
        </slot>
      </div>

    </div>
  </div>
</template>

<script>
import events from '../utils/events'

export default {
  name: 'VaMinibar',
  mixins: [events],
  props: {
    topItems: {
      type: Array,
      required: false
    },
    bottomItems: {
      type: Array,
      required: false
    },
    theme: {
      type: String,
      default: 'blue',
      required: false
    }
  },
  data () {
    let t = this.theme
    return {
      currentDesktopMinimumWidth: 0,
      currentDesktopMargin: 0,
      currentContentWidth: 0,
      currentMinibarWidth: 0,
      currentTopbarHeight: 0,
      minibarPriority: false,
      currentSidebarWidth: 0,
      sidebarPriority: false,
      currentWindowWidth: 0,
      isReverse: false,
      isMobile: false,
      isSplit: false,
      isRTL: false,
      th: t
    }
  },
  mounted () {
    this.dispatch('VaApp', 'Va@minibarConnected', true)
    /**
     * This needs to be wrapped in a short setTimeout to give
     * App time to call enableReceivers().
     */
    setTimeout(() => {
      this.dispatch('VaApp', 'Va@configMinibarThemeChange', this.th)
    }, 10)
  },
  created () {
    this.$on('Va@minibarPresenceCheck', () => {
      this.dispatch('VaApp', 'Va@minibarPresenceReply', true)
    })
    this.$on('Va@desktopMinimumWidthChange', val => {
      this.currentDesktopMinimumWidth = val
    })
    this.$on('Va@desktopMarginChange', val => {
      this.currentDesktopMargin = val
    })
    this.$on('Va@contentWidthChange', val => {
      this.currentContentWidth = val
    })
    this.$on('Va@topbarHeightChange', val => {
      this.currentTopbarHeight = val
    })
    this.$on('Va@minibarWidthChange', val => {
      this.currentMinibarWidth = val
    })
    this.$on('Va@sidebarWidthChange', val => {
      this.currentSidebarWidth = val
    })
    this.$on('Va@minibarPriorityChange', val => {
      this.minibarPriority = val
    })
    this.$on('Va@sidebarPriorityChange', val => {
      this.sidebarPriority = val
    })
    this.$on('Va@windowWidthChange', val => {
      this.currentWindowWidth = val
    })
    this.$on('Va@minibarIsMobile', val => {
      this.isMobile = val
    })
    this.$on('Va@reverseChange', val => {
      this.isReverse = val
    })
    this.$on('Va@minibarThemeChange', val => {
      this.th = val
    })
    this.$on('Va@splitChange', val => {
      this.isSplit = val
    })
    this.$on('Va@rtlChange', val => {
      this.isRTL = val
    })
  },
  beforeDestroy () {
    this.dispatch('VaApp', 'Va@minibarDisconnect', true)
  },
  watch: {
    theme (val) {
      this.th = val
      this.dispatch('VaApp', 'Va@configMinibarThemeChange', this.th)
    }
  },
  computed: {
    classObj () {
      let { th } = this
      let classes = {}

      classes['va-minibar'] = true
      classes['va-minibar--theme-' + th] = true

      return classes
    },
    styleObjInner () {
      let style = {}

      // style['background'] = 'linear-gradient(to left, rgba(0, 0, 0, 0.1) 0px, rgba(0, 0, 0, 0.15) 1px, rgba(0, 0, 0, 0.1) 1px, rgba(0, 0, 0, 0) 40px)'

      return style
    },
    styleObj () {
      let dmw = parseInt(this.currentDesktopMinimumWidth)
      let dm = parseInt(this.currentDesktopMargin)
      let mw = parseInt(this.currentMinibarWidth)
      let th = parseInt(this.currentTopbarHeight)
      let cw = parseInt(this.currentContentWidth)
      let sw = parseInt(this.currentSidebarWidth)
      let sp = this.sidebarPriority
      let mp = this.minibarPriority
      let reverse = this.isReverse
      let mobile = this.isMobile
      let split = this.isSplit
      let rtl = this.isRTL
      let style = {}

      style['width'] = mw + 'px'
      style['min-width'] = mw + 'px'

      if (mp) {
        style['top'] = '0px'
      } else {
        style['top'] = th + 'px'
      }

      style['bottom'] = '0px'

      /**
       * Adjust the margins if content width is smaller than
       * desktop minimum width.
       */
      if (!mobile) {
        if (cw < dmw) {
          let x = dmw - cw
          dm = dm - x / 2
        }
      } else {
        dm = 0
        dmw = 0
      }

      if (split) {
        if (reverse) {
          style['right'] = dm + 'px'
        } else {
          style['left'] = dm + 'px'
        }
      } else {
        if (reverse) {
          if (rtl) {
            style['right'] = dm + 'px'
          } else {
            style['left'] = dm + sw + 'px'
          }
        } else {
          if (rtl) {
            style['right'] = dm + sw + 'px'
          } else {
            style['left'] = dm + 'px'
          }
        }
      }

      if (!mp && sp && !reverse && !split && !rtl) {
        style['top'] = '0px'
      }

      if (rtl && !split && !reverse && mp) {
        style['top'] = '0px'
      }

      if (rtl && !split && reverse && !mp && sp) {
        style['top'] = '0px'
      }

      /**
       * Less than 20 and we don't want overflow.
       * Greater than 20 and we do, because we don't want
       * to hide tooltips.
       */
      if (mw < 20) {
        style['overflow'] = 'hidden'
      } else {
        style['overflow'] = 'visible'
      }

      return style
    }
  }
}
</script>
