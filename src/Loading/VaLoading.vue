<template>
  <span :class="classObj">
    <i :class="iclassObj" />
    <slot />
    <svg viewBox="0 0 50 50" :class="`${classPrefix}-spinner`">
      <circle :class="`${classPrefix}-path`" :style="{ stroke: color }" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
    </svg>
  </span>
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
    fixed: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '#DCDCDC',
      required: false,
      note: 'The color of the svg path.'
    },
    classPrefix: {
      type: String,
      default: 'va'
    }
  },
  computed: {
    classObj () {
      let {classPrefix, center, fixed} = this
      let classes = {}

      classes['affix'] = fixed
      classes[classPrefix + '-page-loading-con'] = true
      classes[classPrefix + '-loading-center'] = center

      return classes
    },
    iclassObj () {
      let {classPrefix, type, size, color} = this
      let classes = {}

      classes[classPrefix + '-page-loading'] = true
      type ? classes[classPrefix + '-loading-' + type] = true : ''
      size ? classes[classPrefix + '-loading-' + size] = true : ''
      color ? classes['text-' + color] = true : ''

      return classes
    }
  }
}
</script>
