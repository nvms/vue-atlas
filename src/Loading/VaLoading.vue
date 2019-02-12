<template>
  <transition name="fade">
    <span :class="classObj" ref="load">
      <i :class="iclassObj" />
      <slot />
      <svg viewBox="0 0 50 50" :class="`${classPrefix}-spinner`">
        <circle :class="`${classPrefix}-path`" :style="{ stroke: color }" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
      </svg>
    </span>
  </transition>
</template>

<script>
export default {
  name: 'VaLoading',
  props: {
    type: {
      type: String
    },
    size: {
      type: String,
      default: 'md',
      validator (v) {
        return [
          'xl',
          'lg',
          'md',
          'sm',
          'xs'
        ].includes(v)
      }
    },
    center: {
      type: Boolean
    },
    color: {
      type: String,
      default: '#6C798F',
      required: false
    },
    classPrefix: {
      type: String,
      default: 'va'
    }
  },
  mounted () {
    if (this.center) {
      document.querySelector('body').appendChild(this.$refs.load)
      this.$once('hook:beforeDestroy', () => {
        document.querySelector('body').removeChild(this.$refs.load)
      })
    }
  },
  computed: {
    classObj () {
      let {classPrefix, center} = this
      let classes = {}

      classes[classPrefix + '-page-loading-con'] = true
      classes[classPrefix + '-loading-center'] = center

      return classes
    },
    iclassObj () {
      let {classPrefix, type, size} = this
      let classes = {}

      classes[classPrefix + '-page-loading'] = true
      type ? classes[classPrefix + '-loading-' + type] = true : ''
      size ? classes[classPrefix + '-loading-' + size] = true : ''

      return classes
    }
  }
}
</script>
