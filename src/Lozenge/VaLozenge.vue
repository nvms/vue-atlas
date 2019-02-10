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
    classPrefix: {
      type: String,
      required: false,
      default: 'va'
    }
  },
  computed: {
    classObj () {
      let {classPrefix, bold, type, size, uppercase, truncate} = this
      let classes = {}

      classes[classPrefix + '-lozenge'] = true
      classes[classPrefix + '-lozenge-bold'] = bold
      type ? classes[classPrefix + '-lozenge-' + type] = true : ''
      size ? classes[classPrefix + '-lozenge-' + size] = true : ''
      uppercase ? classes[classPrefix + '-lozenge-uppercase'] = true : ''
      truncate ? classes[classPrefix + '-lozenge-truncate'] = true : ''

      return classes
    }
  }
}
</script>
