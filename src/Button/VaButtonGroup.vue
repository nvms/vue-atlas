<template>
  <div :class="classObj">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'VaButtonGroup',
  props: {
    vertical: {
      type: Boolean,
      default: false,
      required: false
    },
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  computed: {
    classObj () {
      let {prefixCls, vertical} = this
      let klass = {}

      klass[prefixCls + '-btn-group'] = true
      klass[prefixCls + '-btn-group-vertical'] = vertical

      return klass
    }
  }
}
</script>
