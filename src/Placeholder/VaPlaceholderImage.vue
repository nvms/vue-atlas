<template>
  <div :class="`${prefixCls}-placeholder-image`" />
</template>

<script>
export default {
  name: 'VaPlaceholderImage',
  props: {
    prefixCls: {
      type: String,
      default: 'va'
    }
  }
}
</script>
