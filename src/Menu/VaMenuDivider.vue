<template>
  <div :class="`${classPrefix}-menu__divider`"></div>
</template>

<script>
export default {
  name: 'VaMenuDivider',
  props: {
    classPrefix: {
      type: String,
      default: 'va'
    }
  }
}
</script>
