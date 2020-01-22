<template>
  <div
    @scroll="onScroll"
    :style="wrapperStyleObj"
    class="va-page-wrapper"
  >
    <div :style="containerStyleObj" class="va-page-container">
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
        return ['lg', 'md', 'sm'].includes(v)
      }
    },
    article: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const s = this.size
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
    this.dispatch('VaApp', 'Va@pageConnected', true)
    setTimeout(() => {
      this.dispatch('VaApp', 'Va@configPageSizeChange', this.sz)
    }, 10)
  },
  created () {
    this.$on('Va@pagePresenceCheck', () => {
      this.dispatch('VaApp', 'Va@pagePresenceReply', true)
    })
    this.$on('Va@desktopMinimumWidthChange', val => {
      this.currentDesktopMinimumWidth = val
    })
    this.$on('Va@desktopMarginChange', val => {
      this.currentDesktopMargin = val
    })
    this.$on('Va@sidebarWidthChange', val => {
      this.currentSidebarWidth = val
    })
    this.$on('Va@topbarHeightChange', val => {
      this.currentTopbarHeight = val
    })
    this.$on('Va@contentWidthChange', val => {
      this.currentContentWidth = val
    })
    this.$on('Va@minibarWidthChange', val => {
      this.currentMinibarWidth = val
    })
    this.$on('Va@windowWidthChange', val => {
      this.currentWindowWidth = val
    })
    this.$on('Va@reverseChange', val => {
      this.isReverse = val
    })
    this.$on('Va@pageIsMobile', val => {
      this.isMobile = val
    })
    this.$on('Va@pageBgColorChange', val => {
      this.bg = val
    })
    this.$on('Va@splitChange', val => {
      this.isSplit = val
    })
    this.$on('Va@pageSizeChange', val => {
      this.sz = val
    })
    this.$on('Va@rtlChange', val => {
      this.isRTL = val
    })
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
      const { sz, article, isMobile } = this
      const classes = {}

      isMobile
        ? (classes['va-page-container-lg'] = true)
        : (classes['va-page-container-' + sz] = true)
      classes['va-page-container-article'] = article

      return classes
    },
    containerStyleObj () {
      const style = {}

      return style
    },
    wrapperStyleObj () {
      const split = this.isSplit
      const rtl = this.isRTL
      const reverse = this.isReverse
      const bg = this.bg
      const style = {}

      const sw = parseInt(this.currentSidebarWidth)
      const mw = parseInt(this.currentMinibarWidth)
      const th = parseInt(this.currentTopbarHeight)
      let dm = parseInt(this.currentDesktopMargin)
      let dmw = parseInt(this.currentDesktopMinimumWidth)
      const cw = parseInt(this.currentContentWidth)
      const mobile = this.isMobile

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
          const x = dmw - cw
          dm = dm - x / 2
        }
      } else {
        dm = 0
        dmw = 0
      }

      /**
       * If a minimum desktop width is set...
       */
      if (dmw !== 0) {
        style['min-width'] = dmw - mw - sw + 'px'
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
          style['right'] = sw + mw + dm + 'px'
        } else {
          style['left'] = sw + mw + dm + 'px'
          style['right'] = dm + 'px'
        }
      } else {
        if (reverse) {
          style['left'] = dm + sw + 'px'
          style['right'] = dm + mw + 'px'
        } else {
          style['left'] = dm + mw + 'px'
          style['right'] = dm + sw + 'px'
        }
      }

      return style
    }
  }
}
</script>

<style lang="scss" src="../style/_reset.scss" scoped></style>
<style lang="scss">
@import "../variables";

@mixin page-theme-mixin($background, $color, $scrollbarBackground) {
  .va-page-wrapper {
    background: $background;
    &::-webkit-scrollbar {
      background: $scrollbarBackground;
    }
  }

  .va-page {
    &-container {
      color: $color;
    }
  }
}

@include page-theme-mixin(
  $background: #ffffff,
  $color: black,
  $scrollbarBackground: #ffffff
);

.va-page {
  &-wrapper {
    z-index: 1;
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;

    overflow-y: hidden;
    overflow-x: hidden;

    &:hover {
      overflow-y: auto;
      overflow-x: auto;
    }

    &::-webkit-scrollbar-track {
      border-radius: 10px;
    }

    &::-webkit-scrollbar {
      width: 14px;
      height: 18px;
    }

    &::-webkit-scrollbar-thumb {
      &:hover {
        background-color: rgba(9, 30, 66, 0.45);
      }

      height: 6px;
      border: 4px solid rgba(0, 0, 0, 0);
      background-clip: padding-box;
      -webkit-border-radius: 7px;
      background-color: rgba(9, 30, 66, 0.05);
    }
  }

  &-container {
    position: relative;
    display: flex;

    &-article {
      h1 {
        margin-top: 28px;
        margin-bottom: 8px;
      }

      h2 {
        margin-top: 24px;
        margin-bottom: 8px;
      }

      h3 {
        margin-top: 32px;
        margin-bottom: 8px;
      }

      h4 {
        margin-top: 24px;
        margin-bottom: 8px;
      }

      p {
        margin: 16px 0;
        padding: 0;
      }

      ol li {
        line-height: 26px;
      }

      ul li {
        line-height: 26px;
      }
    }

    &-lg {
      align-items: flex-start;
      flex-wrap: wrap;
      width: 100%;
      max-width: 100%;
      position: relative;
      margin: 0;
      padding: 0 20px;
    }

    &-md {
      align-items: flex-start;
      flex-wrap: wrap;
      width: 960px;
      max-width: 960px;
      position: relative;
      margin: 0 auto;
      padding: 0 20px;
    }

    &-sm {
      align-items: flex-start;
      flex-wrap: wrap;
      position: relative;
      width: 680px;
      max-width: 680px;
      margin: 0 auto;
      padding: 0 20px;
    }
  }

  &-title {
    h1 {
      font-size: 1.7em;
      font-style: inherit;
      font-weight: 500;
      letter-spacing: -0.01em;
      line-height: 1.1;
      margin-top: 40px;
    }
  }

  &-subtitle {
    p {
      font-size: 16px;
      font-weight: 300;
      line-height: 1.4em;
    }
  }
}
</style>
