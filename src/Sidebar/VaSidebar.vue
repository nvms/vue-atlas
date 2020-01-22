<template>
  <div :class="classObj" :style="styleObj">
    <div class="va-sidebar-scrollarea">
      <slot />
    </div>
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
      required: false
    },
    showToggle: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data () {
    const tli = this.textLinks
    const s = this.showToggle
    const c = this.compact
    const t = this.theme
    return {
      currentDesktopMinimumWidth: 0,
      currentDesktopMargin: 0,
      currentSidebarWidth: 0,
      currentTopbarHeight: 0,
      minibarPriority: false,
      currentContentWidth: 0,
      sidebarPriority: false,
      currentMinibarWidth: 0,
      currentWindowWidth: 0,
      isReverse: false,
      isMobile: false,
      isSplit: false,
      isRTL: false,
      comp: c,
      tl: tli,
      th: t,
      st: s
    }
  },
  created () {
    this.$on('Va@sidebarPresenceCheck', () => { this.dispatch('VaApp', 'Va@sidebarPresenceReply', true) })
    this.$on('Va@desktopMinimumWidthChange', (val) => { this.currentDesktopMinimumWidth = val })
    this.$on('Va@desktopMarginChange', (val) => { this.currentDesktopMargin = val })
    this.$on('Va@minibarWidthChange', (val) => { this.currentMinibarWidth = val })
    this.$on('Va@topbarHeightChange', (val) => { this.currentTopbarHeight = val })
    this.$on('Va@contentWidthChange', (val) => { this.currentContentWidth = val })
    this.$on('Va@sidebarWidthChange', (val) => { this.currentSidebarWidth = val })
    this.$on('Va@minibarPriorityChange', (val) => { this.minibarPriority = val })
    this.$on('Va@sidebarPriorityChange', (val) => { this.sidebarPriority = val })
    this.$on('Va@windowWidthChange', (val) => { this.currentWindowWidth = val })
    this.$on('Va@sidebarIsMobile', (val) => { this.isMobile = val })
    this.$on('Va@reverseChange', (val) => { this.isReverse = val })
    this.$on('Va@sidebarThemeChange', (val) => { this.th = val })
    this.$on('Va@showToggleChange', (val) => { this.st = val })
    this.$on('Va@splitChange', (val) => { this.isSplit = val })
    this.$on('Va@textLinksChange', (val) => { this.tl = val })
    this.$on('Va@compactChange', (val) => { this.comp = val })
    this.$on('Va@rtlChange', (val) => { this.isRTL = val })
  },
  mounted () {
    this.dispatch('VaApp', 'Va@sidebarConnected', true)
    /**
     * This needs to be wrapped in a short setTimeout to give
     * App time to call enableReceivers().
     */
    setTimeout(() => {
      this.dispatch('VaApp', 'Va@configSidebarThemeChange', this.th)
      this.dispatch('VaApp', 'Va@configCompactChange', this.comp)
      this.dispatch('VaApp', 'Va@configTextLinksChange', this.tl)
      this.dispatch('VaApp', 'Va@configShowToggleChange', this.st)
    }, 10)
  },
  beforeDestroy () {
    this.dispatch('VaApp', 'Va@sidebarDisconnect', true)
  },
  watch: {
    theme (val) {
      this.th = val
      this.dispatch('VaApp', 'Va@configSidebarThemeChange', this.th)
    }
  },
  computed: {
    classObj () {
      const { th, isMobile, comp, tl } = this
      const classes = {}

      classes['va-sidebar'] = true
      classes['va-sidebar--theme-' + th] = true
      classes['va-sidebar-mobile'] = isMobile
      classes['va-sidebar-compact'] = comp
      classes['va-sidebar-text-links'] = tl

      return classes
    },
    styleObj () {
      let dmw = parseInt(this.currentDesktopMinimumWidth)
      let dm = parseInt(this.currentDesktopMargin)
      const sw = parseInt(this.currentSidebarWidth)
      const th = parseInt(this.currentTopbarHeight)
      const cw = parseInt(this.currentContentWidth)
      const mw = parseInt(this.currentMinibarWidth)
      const sp = this.sidebarPriority
      const mp = this.minibarPriority
      const reverse = this.isReverse
      const mobile = this.isMobile
      const split = this.isSplit
      const rtl = this.isRTL
      const style = {}

      style['width'] = sw + 'px'
      style['min-width'] = sw + 'px'

      if (sp) {
        style['top'] = '0px'
      } else {
        style['top'] = th + 'px'
      }

      /**
       * Adjust the margins if content width is smaller than
       * desktop minimum width.
       */
      if (!mobile) {
        if (cw < dmw) {
          const x = dmw - cw
          dm = dm - (x / 2)
        }
      } else {
        dm = 0
        dmw = 0
      }

      if (split) {
        if (reverse) {
          style['left'] = dm + 'px'
        } else {
          style['right'] = dm + 'px'
        }
      } else {
        if (reverse) {
          if (rtl) {
            style['right'] = (dm + mw) + 'px'
          } else {
            style['left'] = dm + 'px'
          }
        } else {
          if (rtl) {
            style['right'] = dm + 'px'
          } else {
            style['left'] = (dm + mw) + 'px'
          }
        }
      }

      if (!sp && mp && reverse && !split && !rtl) {
        style['top'] = '0px'
      }

      if (rtl && !split && !reverse && !sp && mp) {
        style['top'] = '0px'
      }

      style['bottom'] = '0px'

      return style
    }
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
  //     this.dispatch('VaApp', 'Va@sidebarWidthChange', e.clientX - el.offsetLeft)
  //   },
  //   stopResize () {
  //     window.removeEventListener('mouseup', this.stopResize, false)
  //     window.removeEventListener('mousemove', this.doResize, false)
  //   }
  // }
}
</script>

<style lang="scss" src="../style/_reset.scss" scoped></style>
<style lang="scss">
@import "../variables";
@import "../style/bars";
@import "../style/themes";
</style>
