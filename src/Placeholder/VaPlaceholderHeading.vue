<template>
  <div class="va-placeholder-heading">
    <div v-if="image" class="va-placeholder-heading-image"/>
    <div class="va-placeholder-heading-content">
      <div class="va-placeholder-heading-content-title"/>
      <div class="va-placeholder-heading-content-subtitle"/>
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
    }
  }
}
</script>
