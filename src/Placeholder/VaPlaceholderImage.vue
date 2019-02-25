<template>
  <div :class="`${classPrefix}-placeholder-image`"/>
</template>

<script>
export default {
  name: 'VaPlaceholderImage',
  props: {
    classPrefix: {
      type: String,
      default: 'va'
    }
  }
}
</script>
