<template>
  <span :class="classObj">
    <i :class="iclassObj" />
    <slot />
    <svg viewBox="0 0 50 50" :class="`${prefixCls}-spinner`">
      <circle :class="`${prefixCls}-path`" :style="{ stroke: color }" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
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
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  computed: {
    classObj () {
      let {prefixCls, center, fixed} = this
      let klass = {}

      klass['affix'] = fixed
      klass[prefixCls + '-page-loading-con'] = true
      klass[prefixCls + '-loading-center'] = center

      return klass
    },
    iclassObj () {
      let {prefixCls, type, size, color} = this
      let klass = {}

      klass[prefixCls + '-page-loading'] = true
      type ? klass[prefixCls + '-loading-' + type] = true : ''
      size ? klass[prefixCls + '-loading-' + size] = true : ''
      color ? klass['text-' + color] = true : ''

      return klass
    }
  }
}
</script>
