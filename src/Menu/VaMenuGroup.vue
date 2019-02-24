<template>
  <div :class="`${classPrefix}-menu__group`">
    <div v-if="title" :class="`${classPrefix}-menu__title`">{{title}}</div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VaMenuGroup',
  props: {
    title: {
      type: String,
      required: false
    },
    classPrefix: {
      type: String,
      default: 'va'
    }
  }
}
</script>
