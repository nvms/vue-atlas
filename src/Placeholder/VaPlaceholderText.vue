<template>
  <div class="va-placeholder-text">
    <div
      v-for="line in lines"
      :key="line"
      class="va-placeholder-text-line"
    />
  </div>
</template>

<script>
export default {
  name: 'VaPlaceholderText',
  props: {
    lines: {
      type: Number,
      default: 4
    }
  }
}
</script>
