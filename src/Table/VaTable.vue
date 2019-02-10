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
    classPrefix: {
      type: String,
      default: 'va'
    }
  },
  computed: {
    classObj () {
      let {classPrefix, size, hover} = this
      let classes = {}

      classes[classPrefix + '-table'] = true
      classes[classPrefix + '-table-' + size] = true
      classes[classPrefix + '-table-hover'] = hover

      return classes
    }
  }
}
</script>
