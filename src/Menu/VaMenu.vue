<template>
  <nav
    :class="`${classPrefix}-menu`"
    role="menu"
    outline="none">
    <slot/>
  </nav>
</template>

<script>
export default {
  name: 'VaMenu',
  props: {
    classPrefix: {
      type: String,
      default: 'va'
    }
  }
}
</script>
