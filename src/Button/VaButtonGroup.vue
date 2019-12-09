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
    }
  },
  computed: {
    classObj () {
      const { vertical } = this
      const classes = {}

      classes['va-btn-group'] = true
      classes['va-btn-group-vertical'] = vertical

      return classes
    }
  }
}
</script>
