<template>
  <div :class="`${prefixCls}-sidebar-header`">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VaSidebarHeader',
  props: {
    prefixCls: {
      type: String,
      default: 'va'
    }
  }
}
</script>
