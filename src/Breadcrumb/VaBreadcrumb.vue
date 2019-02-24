<template>
  <div :class="`${classPrefix}-breadcrumb`">
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
    classPrefix: {
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

<style lang="scss">
.#{$class-prefix}-breadcrumb {
  cursor: default;
  &-item {
    color: $N200;
    &-icon {

    }
    &-icon, &-separator {
      margin:0 5px !important;
    }
    &:last-child {
      .#{$class-prefix}-breadcrumb-item-icon {
        display: none;
      }
      .#{$class-prefix}-breadcrumb-item-separator {
        display: none !important;
      }
    }
  }
  &-link {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
      color: $B300;
    }
    &:active {
      color: $B500;
      text-decoration: none;
    }
  }
}
</style>