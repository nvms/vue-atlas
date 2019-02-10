<template>
  <div :class="`${classPrefix}-placeholder-text`">
    <div v-for="line in lines" :key="line" :class="`${classPrefix}-placeholder-text-line`" />
  </div>
</template>

<script>
export default {
  name: 'VaPlaceholderText',
  props: {
    lines: {
      type: Number,
      default: 4
    },
    classPrefix: {
      type: String,
      default: 'va'
    }
  }
}
</script>
