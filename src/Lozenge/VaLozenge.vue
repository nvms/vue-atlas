<template>
  <span :class="classObj">
    <slot />
  </span>
</template>

<script>
export default {
  name: 'VaLozenge',
  props: {
    type: {
      type: String,
      required: false,
      default: 'default',
      note: 'The style of lozenge to render.',
      validator (v) {
        return [
          'default',
          'primary',
          'success',
          'warning',
          'danger',
          'subtle',
          'purple'
        ].includes(v)
      }
    },
    bold: {
      type: Boolean,
      required: false,
      default: false,
      note: 'Whether or not to render the bold version of the lozenge.'
    },
    uppercase: {
      type: Boolean,
      required: false,
      default: false,
      note: 'Whether or not to render the uppercase version of the lozenge.'
    },
    truncate: {
      type: Boolean,
      required: false,
      default: false,
      note: 'Whether or not to truncate text after 200px'
    },
    size: {
      type: String,
      required: false,
      note: 'Which size of lozenge to render.',
      validator (v) {
        return [
          'lg',
          'sm'
        ].includes(v)
      }
    },
    prefixCls: {
      type: String,
      required: false,
      default: 'va'
    }
  },
  computed: {
    classObj () {
      let {prefixCls, bold, type, size, uppercase, truncate} = this
      let klass = {}

      klass[prefixCls + '-lozenge'] = true
      klass[prefixCls + '-lozenge-bold'] = bold
      type ? klass[prefixCls + '-lozenge-' + type] = true : ''
      size ? klass[prefixCls + '-lozenge-' + size] = true : ''
      uppercase ? klass[prefixCls + '-lozenge-uppercase'] = true : ''
      truncate ? klass[prefixCls + '-lozenge-truncate'] = true : ''

      return klass
    }
  }
}
</script>
