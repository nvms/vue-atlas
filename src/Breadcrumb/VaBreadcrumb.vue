<template>
  <div :class="`${prefixCls}-breadcrumb`">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'VaBreadcrumb',
  props: {
    separator: {
      type: String,
      default: '/',
      required: false,
      note: 'The separator to be rendered between breadcrumb items.'
    },
    separatorIcon: {
      type: String,
      default: '',
      required: false,
      note: 'The separator icon to be rendered between breadcrumb items. It\'s a va-icon component, so a valid icon type must be passed.'
    },
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  provide () {
    return {
      VaBreadcrumbParent: this
    }
  }
}
</script>
