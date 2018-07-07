<template>
  <span :class="classObj" :style="{margin:margin}">
    <slot />
  </span>
</template>

<script>
export default {
  name: 'VaBadge',
  props: {
    type: {
      type: String,
      default: 'default',
      required: false,
      validator (v) {
        return [
          'default',
          'primary',
          'success',
          'info',
          'warning',
          'danger'
        ].includes(v)
      },
      note: 'The style of badge to render.'
    },
    margin: {
      type: String,
      default: '0px',
      required: false,
      note: 'Margin to be applied to the outside of the badge element.'
    },
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  computed: {
    classObj () {
      let {prefixCls, type} = this
      let klass = {}

      klass[prefixCls + '-badge'] = true
      klass[prefixCls + '-badge-' + type] = true

      return klass
    }
  }
}
</script>
