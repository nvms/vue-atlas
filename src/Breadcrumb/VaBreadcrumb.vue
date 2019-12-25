<template>
  <div class="va-breadcrumb">
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
      required: false
    },
    separatorIcon: {
      type: String,
      default: '',
      required: false
    }
  },
  provide () {
    return {
      VaBreadcrumbParent: this
    }
  }
}
</script>

<style lang="scss" src="../style/_reset.scss" scoped></style>
<style lang="scss">
@import "../variables";

.va-breadcrumb {
  cursor: default;
  &-item {
    color: $N200;
    &-icon,
    &-separator {
      margin: 0 5px !important;
    }
    &:last-child {
      .va-breadcrumb-item-icon {
        display: none;
      }
      .va-breadcrumb-item-separator {
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
