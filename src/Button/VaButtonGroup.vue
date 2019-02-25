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
    classPrefix: {
      type: String,
      default: 'va'
    }
  },
  computed: {
    classObj () {
      let { classPrefix, vertical } = this
      let classes = {}

      classes[classPrefix + '-btn-group'] = true
      classes[classPrefix + '-btn-group-vertical'] = vertical

      return classes
    }
  }
}
</script>
