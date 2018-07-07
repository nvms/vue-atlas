<template>
  <div :class="`${prefixCls}-placeholder-text`">
    <div v-for="line in lines" :key="line" :class="`${prefixCls}-placeholder-text-line`" />
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
    prefixCls: {
      type: String,
      default: 'va'
    }
  }
}
</script>
