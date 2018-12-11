<template>
  <div :class="classObj">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'VaContainer',
  props: {
    fluid: {
      type: Boolean
    },
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  computed: {
    classObj () {
      let {prefixCls, fluid} = this
      let klass = {}

      klass[prefixCls + '-container-fluid'] = fluid
      klass[prefixCls + '-container'] = !fluid
      klass['clearfix'] = true

      return klass
    }
  }
}
</script>
