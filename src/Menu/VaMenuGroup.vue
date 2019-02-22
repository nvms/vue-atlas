<template>
  <div :class="`${classPrefix}-menu__group`">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VaMenuGroup',
  props: {
    classPrefix: {
      type: String,
      default: 'va'
    }
  }
}
</script>
