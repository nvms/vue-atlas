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
    }
  },
  computed: {
    classObj () {
      let { fluid } = this
      let classes = {}

      classes['va-container-fluid'] = fluid
      classes['va-container'] = !fluid
      classes['clearfix'] = true

      return classes
    }
  }
}
</script>
