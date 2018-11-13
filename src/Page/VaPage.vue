<template>
  <div :style="styleObj" :class="`${prefixCls}-page-wrapper`">
    <div :class="`${prefixCls}-page-container`">
      <div :class="pageClassObj">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
import events from '../utils/events'

export default {
  name: 'VaPage',
  mixins: [events],
  props: {
    size: {
      type: String,
      default: 'lg',
      validator (v) {
        return [
          'lg',
          'md',
          'sm'
        ].includes(v)
      },
      note: 'The size of the page.'
    },
    article: {
      type: Boolean,
      default: false,
      note: 'When true, applies some additional CSS to header elements for more comfortable spacing.'
    },
    bgColor: {
      type: String,
      default: '#fff',
      required: false
    },
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  data () {
    let bgColor = this.bgColor
    let s = this.size
    return {
      currentDesktopMinimumWidth: 0,
      currentSidebarWidth: 240,
      currentMinibarWidth: 64,
      currentDesktopMargin: 0,
      currentTopbarHeight: 0,
      currentContentWidth: 0,
      currentWindowWidth: 0,
      isReverse: false,
      isMobile: false,
      isSplit: false,
      isRTL: false,
      bg: bgColor,
      sz: s
    }
  },
  mounted () {
    setTimeout(() => {
      this.dispatch('VaLayoutManager', 'Va@configPageSizeChange', this.sz)
    }, 10)
  },
  created () {
    this.$on('Va@pagePresenceCheck', (val) => { this.dispatch('VaLayoutManager', 'Va@pagePresenceReply', true) })
    this.$on('Va@desktopMinimumWidthChange', (val) => { this.currentDesktopMinimumWidth = val })
    this.$on('Va@desktopMarginChange', (val) => { this.currentDesktopMargin = val })
    this.$on('Va@sidebarWidthChange', (val) => { this.currentSidebarWidth = val })
    this.$on('Va@topbarHeightChange', (val) => { this.currentTopbarHeight = val })
    this.$on('Va@contentWidthChange', (val) => { this.currentContentWidth = val })
    this.$on('Va@minibarWidthChange', (val) => { this.currentMinibarWidth = val })
    this.$on('Va@windowWidthChange', (val) => { this.currentWindowWidth = val })
    this.$on('Va@reverseChange', (val) => { this.isReverse = val })
    this.$on('Va@pageIsMobile', (val) => { this.isMobile = val })
    this.$on('Va@pageBgColorChange', (val) => { this.bg = val })
    this.$on('Va@splitChange', (val) => { this.isSplit = val })
    this.$on('Va@pageSizeChange', (val) => { this.sz = val })
    this.$on('Va@rtlChange', (val) => { this.isRTL = val })
  },
  beforeDestroy () {
    this.dispatch('VaLayoutManager', 'Va@pageDisconnect', true)
  },
  computed: {
    pageClassObj () {
      let {prefixCls, sz, article, isMobile} = this
      let klass = {}

      isMobile ? klass[prefixCls + '-page-container-lg'] = true : klass[prefixCls + '-page-container-' + sz] = true
      klass[prefixCls + '-page-container-article'] = article

      return klass
    },
    styleObj () {
      // let {prefixCls, sidebarWidth} = this
      let split = this.isSplit
      let rtl = this.isRTL
      let reverse = this.isReverse
      let bg = this.bg
      let stl = {}

      let sw = parseInt(this.currentSidebarWidth)
      let mw = parseInt(this.currentMinibarWidth)
      let th = parseInt(this.currentTopbarHeight)
      let dm = parseInt(this.currentDesktopMargin)
      let dmw = parseInt(this.currentDesktopMinimumWidth)
      let cw = parseInt(this.currentContentWidth)
      let mobile = this.isMobile

      // let possibleWidth = mw + sw + (dm * 2)

      stl['background'] = bg
      stl['position'] = 'fixed'
      stl['top'] = th + 'px'
      stl['height'] = 'calc(100% - ' + th + 'px)'

      // If past mobile breakpoint - set overflow to auto so that scrolling is more natural
      stl['overflow-y'] = 'scroll'
      stl['overflow-x'] = 'auto'
      // Otherwise... don't.
      // stl['overflow'] = 'auto'
      // stl['width'] = 'calc(100% - ' + sw + mw + 'px)'

      /**
       * Adjust the margins if content width is smaller than
       * desktop minimum width.
       */
      if (!mobile) {
        if (cw < dmw) {
          let x = dmw - cw
          dm = dm - (x / 2)
        }
      } else {
        dm = 0
        dmw = 0
      }

      /**
       * If a minimum desktop width is set
       */
      if (dmw !== 0) {
        stl['min-width'] = (dmw - mw - sw) + 'px'
      } else {
        stl['min-width'] = '0px'
      }

      // The layout isn't split, so Page is only
      // concerned with total width of bars
      if (!split) {
        if (rtl) {
          stl['left'] = dm + 'px'
          stl['right'] = (sw + mw + dm) + 'px'
        } else {
          stl['left'] = (sw + mw + dm) + 'px'
          stl['right'] = dm + 'px'
        }
      } else {
        // So it's a split layout
        // If reverse is also true, that means that the
        // sidebar will be moved to the left,
        // and the minibar is moved to the right
        // SO.. our 'left' distance should be equal to the width of the minibar
        if (reverse) {
          stl['left'] = (dm + sw) + 'px'
          stl['right'] = (dm + mw) + 'px'
        } else {
          stl['left'] = (dm + mw) + 'px'
          stl['right'] = (dm + sw) + 'px'
        }
      }

      return stl
    }
  }
}
</script>
