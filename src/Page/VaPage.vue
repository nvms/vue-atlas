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
      default: 'md',
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
    return {
      currentSidebarWidth: 240,
      currentMinibarWidth: 64,
      currentTopbarHeight: 0,
      isMobile: false,
      isRTL: false
    }
  },
  created () {
    this.$on('Va@sidebarWidthChange', (val) => {
      this.currentSidebarWidth = val
    })
    this.$on('Va@minibarWidthChange', (val) => {
      this.currentMinibarWidth = val
    })
    this.$on('Va@topbarHeightChange', (val) => {
      this.currentTopbarHeight = val
    })
    this.$on('Va@pageIsMobile', (val) => {
      if (val === true) {
        this.isMobile = true
      } else {
        this.isMobile = false
      }
    })
    this.$on('Va@pageIsRTL', (val) => {
      this.isRTL = val
    })
    this.$on('Va@pagePresenceCheck', (val) => {
      this.dispatch('VaLayoutManager', 'Va@pagePresenceReply', true)
    })
  },
  beforeDestroy () {
    this.dispatch('VaLayoutManager', 'Va@pageDisconnect', true)
  },
  computed: {
    pageClassObj () {
      let {prefixCls, size, article, isMobile} = this
      let klass = {}

      isMobile ? klass[prefixCls + '-page-container-lg'] = true : klass[prefixCls + '-page-container-' + size] = true
      klass[prefixCls + '-page-container-article'] = article

      return klass
    },
    styleObj () {
      // let {prefixCls, sidebarWidth} = this
      let {isRTL} = this
      let stl = {}

      let sbw = parseInt(this.currentSidebarWidth)
      let mbw = parseInt(this.currentMinibarWidth)
      let tbh = parseInt(this.currentTopbarHeight)
      let totalw = sbw + mbw

      stl['position'] = 'absolute'
      isRTL ? stl['left'] = '0px' : stl['left'] = totalw + 'px'
      // stl['paddingTop'] = tbh + 'px'
      stl['top'] = tbh + 'px'
      stl['width'] = 'calc(100% - ' + totalw + 'px)'
      stl['height'] = 'calc(100% - ' + tbh + 'px)'

      return stl
    }
  }
}
</script>
