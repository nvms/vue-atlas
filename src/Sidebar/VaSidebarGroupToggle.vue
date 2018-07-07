<template>
  <span :class="classObj">
    <span :class="iconObj">
      <va-icon type="angle-right" size="12px" margin="0 8px 0 0" v-if="!open"></va-icon>
      <va-icon type="angle-down" size="12px" margin="0 4.5px 0 0" v-else></va-icon>
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
    },
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  computed: {
    classObj () {
      let {prefixCls, open} = this
      let klass = {}

      klass[prefixCls + '-sidebar-group-item-toggle'] = true
      klass[prefixCls + '-sidebar-group-item-toggle-closed'] = !open

      return klass
    },
    iconObj () {
      let {prefixCls, open} = this
      let klass = {}

      klass[prefixCls + '-sidebar-group-item-toggle-icon'] = true
      klass[prefixCls + '-sidebar-group-item-toggle-icon-closed'] = !open

      return klass
    }
  }
}
</script>
