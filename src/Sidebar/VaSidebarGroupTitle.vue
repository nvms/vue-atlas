<template>
  <div :class="`${prefixCls}-sidebar-group-title`">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VaSidebarGroupTitle',
  props: {
    prefixCls: {
      type: String,
      default: 'va'
    }
  }
}
</script>
