<template>
  <div :class="classObj">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VaTable',
  props: {
    fullWidth: {
      type: Boolean,
      default: false,
      required: false,
      note: 'When true, the table will be given 100% width to fill up the parent container.'
    },
    hover: {
      type: Boolean,
      default: false,
      required: false,
      note: 'When true, changes the background color of rows when hovering.'
    },
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  computed: {
    classObj () {
      let {prefixCls, fullWidth, hover} = this
      let klass = {}

      klass[prefixCls + '-table'] = true
      klass[prefixCls + '-table-fullwidth'] = fullWidth
      klass[prefixCls + '-table-hover'] = hover

      return klass
    }
  }
}
</script>
