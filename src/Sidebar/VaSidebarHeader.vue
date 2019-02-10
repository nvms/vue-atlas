<template>
  <div :class="`${classPrefix}-sidebar-header`">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VaSidebarHeader',
  props: {
    classPrefix: {
      type: String,
      default: 'va'
    }
  }
}
</script>
