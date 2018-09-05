<template>
  <div :class="classObj">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VaTable',
  props: {
    hover: {
      type: Boolean,
      default: false,
      required: false,
      note: 'When true, changes the background color of rows when hovering.'
    },
    size: {
      type: String,
      default: 'lg',
      validator (v) {
        return [
          'lg',
          'md',
          'sm'
        ].includes(v)
      },
      note: 'The size of the table.'
    },
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  computed: {
    classObj () {
      let {prefixCls, size, hover} = this
      let klass = {}

      klass[prefixCls + '-table'] = true
      klass[prefixCls + '-table-' + size] = true
      klass[prefixCls + '-table-hover'] = hover

      return klass
    }
  }
}
</script>
