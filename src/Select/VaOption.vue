<template>
  <div :value="value" :class="`${prefixCls}-option`">
    <va-icon v-if="icon" :type="icon" margin="0 6px 0 0" style="padding:0 !important;top:0 !important;margin-left:0 !important;"></va-icon>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VaOption',
  props: {
    value: {
      type: String
    },
    icon: {
      type: String,
      default: ''
    },
    prefixCls: {
      type: String,
      default: 'va'
    }
  }
}
</script>
