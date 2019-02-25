<template>
  <div :class="`${classPrefix}-placeholder-heading`">
    <div v-if="image" :class="`${classPrefix}-placeholder-heading-image`"/>
    <div :class="`${classPrefix}-placeholder-heading-content`">
      <div :class="`${classPrefix}-placeholder-heading-content-title`"/>
      <div :class="`${classPrefix}-placeholder-heading-content-subtitle`"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VaPlaceholderHeading',
  props: {
    image: {
      type: Boolean,
      default: false
    },
    classPrefix: {
      type: String,
      default: 'va'
    }
  }
}
</script>
