<template>
  <div
    ref="scrollArea"
    id="vaSidebarScrollArea"
    :class="classObj"
    @scroll="onScroll"
  >
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'VaSidebarScrollarea',
  props: {
    classPrefix: {
      type: String,
      default: 'va'
    }
  },
  data () {
    return {
      scrolled: false
    }
  },
  methods: {
    onScroll () {
      let el = document.getElementById('vaSidebarScrollArea')
      let y = el.scrollTop
      if (y > 1) {
        this.scrolled = true
      } else {
        this.scrolled = false
      }
    }
  },
  computed: {
    classObj () {
      // let {classPrefix, scrolled} = this
      let { classPrefix } = this
      let classes = {}

      classes[classPrefix + '-sidebar-scrollarea'] = true
      // scrolled ? classes[classPrefix + '-sidebar-scrollarea-scrolled'] = true : ''

      return classes
    }
  }
}
</script>
