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
          'danger',
          'change'
        ].includes(v)
      },
      note: 'The type of alert to render.'
    },
    classPrefix: {
      type: String,
      default: 'va'
    }
  },
  computed: {
    classObj () {
      let {classPrefix, type} = this
      let classes = {}

      classes[classPrefix + '-alert'] = true
      classes[classPrefix + '-alert-' + type] = true

      return classes
    }
  }
}
</script>
