<template>
  <div :class="classObj">
    <slot/>
  </div>
</template>
<script>
export default {
  name: 'VaContainer',
  props: {
    fluid: {
      type: Boolean
    },
    classPrefix: {
      type: String,
      default: 'va'
    }
  },
  computed: {
    classObj () {
      let { classPrefix, fluid } = this
      let classes = {}

      classes[classPrefix + '-container-fluid'] = fluid
      classes[classPrefix + '-container'] = !fluid
      classes['clearfix'] = true

      return classes
    }
  }
}
</script>
