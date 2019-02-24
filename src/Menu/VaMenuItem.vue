<template>
  <div
    :class="`${classPrefix}-menu__item`"
    role="menuitem"
    tabindex="0"
    @click="onSelect">
    <span>
      <slot />
    </span>
  </div>
</template>

<script>
export default {
  name: 'VaMenuItem',
  props: {
    classPrefix: {
      type: String,
      default: 'va'
    }
  },
  methods: {
    onSelect (e) {
      this.$emit('select', e)
    }
  }
}
</script>
