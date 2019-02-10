<template>
  <div :class="classObj">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VaPlaceholder',
  props: {
    rounded: {
      type: Boolean,
      default: false
    },
    centered: {
      type: Boolean,
      default: false
    },
    animated: {
      type: Boolean,
      default: false
    },
    classPrefix: {
      type: String,
      default: 'va'
    }
  },
  computed: {
    classObj () {
      let {classPrefix, rounded, centered, animated} = this
      let classes = {}

      classes[classPrefix + '-placeholder'] = true
      classes[classPrefix + '-placeholder-rounded'] = rounded
      classes[classPrefix + '-placeholder-centered'] = centered
      classes[classPrefix + '-placeholder-animated'] = animated

      return classes
    }
  }
}
</script>
