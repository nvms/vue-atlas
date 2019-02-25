<template>
  <div :class="`${classPrefix}-sidebar-group-title`">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'VaSidebarGroupTitle',
  props: {
    classPrefix: {
      type: String,
      default: 'va'
    }
  }
}
</script>
