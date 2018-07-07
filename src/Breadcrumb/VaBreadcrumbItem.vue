<template>
  <span :class="`${prefixCls}-breadcrumb-item`">

    <span
      :class="[prefixCls + '-breadcrumb-item-inner', to ? prefixCls + '-breadcrumb-link' : '']"
      ref="link">
      <slot/>
    </span>

    <va-icon v-if="separatorIcon" :type="separatorIcon" :class="`${prefixCls}-breadcrumb-item-icon`"></va-icon>
    <span v-else :class="`${prefixCls}-breadcrumb-item-separator`">{{separator}}</span>
  </span>
</template>

<script>
export default {
  name: 'VaBreadcrumbItem',
  props: {
    to: {},
    replace: {
      type: Boolean,
      default: false,
      required: false,
      note: 'When true, the router method used is replace() instead of push(), which does not leave a history trail.'
    },
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  data () {
    return {
      separator: '',
      separatorIcon: ''
    }
  },
  inject: ['VaBreadcrumbParent'],
  mounted () {
    this.separator = this.VaBreadcrumbParent.separator
    this.separatorIcon = this.VaBreadcrumbParent.separatorIcon
    const link = this.$refs.link

    link.addEventListener('click', () => {
      const { to, $router } = this

      if (!to || !$router) return
      this.replace ? $router.replace(to) : $router.push(to)
    })
  }
}
</script>
