<template>
  <span class="va-breadcrumb-item">
    <span
      :class="['va-breadcrumb-item-inner', to || href ? 'va-breadcrumb-link' : '']"
      ref="link"
    >
      <slot/>
    </span>
    <va-icon
      v-if="separatorIcon"
      :type="separatorIcon"
      class="va-breadcrumb-item-icon"
    />
    <span
      v-else
      class="va-breadcrumb-item-separator"
    >{{separator}}</span>
  </span>
</template>

<script>
export default {
  name: 'VaBreadcrumbItem',
  props: {
    to: {},
    href: {
      type: String,
      required: false
    },
    replace: {
      type: Boolean,
      default: false,
      required: false
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

    link.addEventListener('click', (e) => {
      this.$emit('click', e)
      if (this.href) {
        window.location.href = this.href
        return
      }

      const { to, $router } = this

      if (!to || !$router) return
      this.replace ? $router.replace(to) : $router.push(to)
    })
  }
}
</script>
