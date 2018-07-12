<template>
  <div
    :class="classObj"
    :style="styleObj">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'VaBars',
  props: {
    sidebarWidth: {
      type: [String, Number],
      default: 0,
      required: false
    },
    minibarWidth: {
      type: [String, Number],
      default: 0,
      required: false
    },
    reverse: {
      type: Boolean,
      default: false,
      note: 'When true, moves the minibar to the right of the sidebar.'
    },
    relative: {
      type: Boolean,
      default: false,
      required: false,
      note: 'Convenience prop to set position: relative for certain use cases.'
    },
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  data () {
    return {
      currentSidebarWidth: this.sidebarWidth,
      currentMinibarWidth: this.minibarWidth,
      currentTopbarHeight: 0,
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
    this.$on('Va@barsIsRTL', (val) => {
      this.isRTL = val
    })
  },
  computed: {
    classObj () {
      let {prefixCls, relative} = this
      let klass = {}

      klass[prefixCls + '-bars'] = true
      klass['relative'] = relative

      return klass
    },
    styleObj () {
      let {currentSidebarWidth, currentMinibarWidth, currentTopbarHeight, reverse, isRTL} = this
      let sideWidth = parseInt(currentSidebarWidth)
      let miniWidth = parseInt(currentMinibarWidth)
      let topHeight = parseInt(currentTopbarHeight)
      let style = {}

      style['top'] = topHeight + 'px'
      style['width'] = sideWidth + miniWidth + 'px'
      style['paddingBottom'] = topHeight + 'px'
      reverse ? style['flexDirection'] = 'row-reverse' : ''
      isRTL ? style['right'] = '0px' : ''

      return style
    }
  }
}
</script>
