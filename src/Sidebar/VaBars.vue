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
      default: 240,
      required: false
    },
    minibarWidth: {
      type: [String, Number],
      default: 64,
      required: false
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
      currentTopbarHeight: 0
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
      let {currentSidebarWidth, currentMinibarWidth, currentTopbarHeight} = this
      let sideWidth = parseInt(currentSidebarWidth)
      let miniWidth = parseInt(currentMinibarWidth)
      let topHeight = parseInt(currentTopbarHeight)
      let style = {}

      style['top'] = topHeight + 'px'
      style['width'] = sideWidth + miniWidth + 'px'
      style['paddingBottom'] = topHeight + 'px'

      return style
    }
  }
}
</script>
