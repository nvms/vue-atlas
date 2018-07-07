<template>
  <div :class="`${prefixCls}-placeholder-heading`">
    <div v-if="image" :class="`${prefixCls}-placeholder-heading-image`" />
    <div :class="`${prefixCls}-placeholder-heading-content`">
      <div :class="`${prefixCls}-placeholder-heading-content-title`" />
      <div :class="`${prefixCls}-placeholder-heading-content-subtitle`" />
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
    prefixCls: {
      type: String,
      default: 'va'
    }
  }
}
</script>
