<template>
  <div :class="`${prefixCls}-btn-group`">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'VaButtonGroup',
  props: {
    prefixCls: {
      type: String,
      default: 'va'
    }
  }
}
</script>
