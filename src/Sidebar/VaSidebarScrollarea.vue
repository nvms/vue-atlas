<template>
  <div ref="scrollArea" id="akSidebarScrollArea" :class="classObj" @scroll="onScroll">
      <slot/>
  </div>
</template>

<script>
export default {
  name: 'VaSidebarScrollarea',
  props: {
    prefixCls: {
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
      let el = document.getElementById('akSidebarScrollArea')
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
      // let {prefixCls, scrolled} = this
      let {prefixCls} = this
      let klass = {}

      klass[prefixCls + '-sidebar-scrollarea'] = true
      // scrolled ? klass[prefixCls + '-sidebar-scrollarea-scrolled'] = true : ''

      return klass
    }
  }
}
</script>
