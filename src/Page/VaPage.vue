<template>
  <div
    @scroll="onScroll"
    :style="wrapperStyleObj"
    :class="`${prefixCls}-page-wrapper`">
    <div :style="containerStyleObj" :class="`${prefixCls}-page-container`">
      <div :class="classObj">
        <slot/>
        <div style="height:100px;">&nbsp;</div>
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
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  data () {
    let s = this.size
    return {
      currentDesktopMinimumWidth: 0,
      currentSidebarWidth: 0,
      currentMinibarWidth: 0,
      currentDesktopMargin: 0,
      currentTopbarHeight: 0,
      currentContentWidth: 0,
      currentWindowWidth: 0,
      isReverse: false,
      isMobile: false,
      isSplit: false,
      isRTL: false,
      bg: '#ffffff',
      sz: s
    }
  },
  mounted () {
    setTimeout(() => {
      this.dispatch('VaApp', 'Va@configPageSizeChange', this.sz)
    }, 10)
  },
  created () {
    this.$on('Va@pagePresenceCheck', () => { this.dispatch('VaApp', 'Va@pagePresenceReply', true) })
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
    this.dispatch('VaApp', 'Va@pageDisconnect', true)
  },
  methods: {
    onScroll () {
      // this.broadcast('VaTextarea', 'Va@pageScroll', true)
      // this.broadcast('VaInput', 'Va@pageScroll', true)
      /**
       * This is probably faster than my broadcast method, and I'd
       * like for this to happen as fast as possible.
       * 
       * We're dispatching this scroll event when this element
       * is scrolled so that the VaInputOps (and other fixed
       * position elements) know to reposition themselves.
       * 
       * When a VaPage is not used, VaInput and VaTextarea
       * listen to window events, so they still work even when
       * used by themselves.
       */
      window.dispatchEvent(new Event('scroll'))
    }
  },
  computed: {
    classObj () {
      let {prefixCls, sz, article, isMobile} = this
      let klass = {}
      
      isMobile ? klass[prefixCls + '-page-container-lg'] = true : klass[prefixCls + '-page-container-' + sz] = true
      klass[prefixCls + '-page-container-article'] = article

      return klass
    },
    containerStyleObj () {
      let style = {}

      return style
    },
    wrapperStyleObj () {
      let split = this.isSplit
      let rtl = this.isRTL
      let reverse = this.isReverse
      let bg = this.bg
      let style = {}

      let sw = parseInt(this.currentSidebarWidth)
      let mw = parseInt(this.currentMinibarWidth)
      let th = parseInt(this.currentTopbarHeight)
      let dm = parseInt(this.currentDesktopMargin)
      let dmw = parseInt(this.currentDesktopMinimumWidth)
      let cw = parseInt(this.currentContentWidth)
      let mobile = this.isMobile

      style['background'] = bg
      style['position'] = 'fixed'
      style['top'] = th + 'px'
      style['height'] = 'calc(100% - ' + th + 'px)'
      style['overflow-y'] = 'scroll'
      style['overflow-x'] = 'auto'

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
       * If a minimum desktop width is set...
       */
      if (dmw !== 0) {
        style['min-width'] = (dmw - mw - sw) + 'px'
      } else {
        style['min-width'] = '0px'
      }

      /**
       * If it's not a split layout, then Page is only
       * concerned with the total width of the bars.
       */
      if (!split) {
        if (rtl) {
          style['left'] = dm + 'px'
          style['right'] = (sw + mw + dm) + 'px'
        } else {
          style['left'] = (sw + mw + dm) + 'px'
          style['right'] = dm + 'px'
        }
      } else {
        if (reverse) {
          style['left'] = (dm + sw) + 'px'
          style['right'] = (dm + mw) + 'px'
        } else {
          style['left'] = (dm + mw) + 'px'
          style['right'] = (dm + sw) + 'px'
        }
      }

      return style
    }
  }
}
</script>
