<template>
  <span :class="classObj">
    <span :class="iconObj">
      <va-icon type="angle-right" size="12px" margin="0 6px 0 0" v-if="!open"/>
      <va-icon type="angle-down" size="12px" margin="0 4.5px 0 0" v-else/>
    </span>
  </span>
</template>

<script>
export default {
  name: 'VaSidebarGroupToggle',
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classObj () {
      const { open } = this
      const classes = {}

      classes['va-sidebar-group-item-toggle'] = true
      classes['va-sidebar-group-item-toggle-closed'] = !open

      return classes
    },
    iconObj () {
      const { open } = this
      const classes = {}

      classes['va-sidebar-group-item-toggle-icon'] = true
      classes['va-sidebar-group-item-toggle-icon-closed'] = !open

      return classes
    }
  }
}
</script>
