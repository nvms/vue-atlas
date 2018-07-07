<template>
  <div :class="classObj">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'VaAlert',
  props: {
    title: {
      type: String,
      required: false,
      note: 'The title to be rendered.'
    },
    type: {
      type: String,
      default: 'warning',
      required: false,
      validator (v) {
        return [
          'success',
          'info',
          'warning',
          'danger'
        ].includes(v)
      },
      note: 'The type of alert to render.'
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

      klass[prefixCls + '-alert'] = true
      klass[prefixCls + '-alert-' + type] = true

      return klass
    }
  }
}
</script>
