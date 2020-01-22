<template>
  <span :class="classObj" :style="{ margin: margin }">
    <slot/>
  </span>
</template>

<script>
export default {
  name: 'VaBadge',
  props: {
    type: {
      type: String,
      default: 'default',
      required: false,
      validator (v) {
        return [
          'default',
          'primary',
          'success',
          'info',
          'warning',
          'danger'
        ].includes(v)
      }
    },
    margin: {
      type: String,
      default: '0px',
      required: false
    }
  },
  computed: {
    classObj () {
      const { type } = this
      const classes = {}

      classes['va-badge'] = true
      classes['va-badge-' + type] = true

      return classes
    }
  }
}
</script>

<style lang="scss" src="../style/_reset.scss" scoped></style>
<style lang="scss">
@import "../variables";

.va-badge {
  display: inline-block;
  text-align: center;
  font-weight: normal;
  min-width: 10px;
  padding: 3px 7px;
  border-radius: 32px;
  line-height: 1;
  font-size: 12px;

  &-default {
    background-color: $N30;
    color: $N800;
  }
  &-primary {
    background-color: $B200;
    color: $N0;
  }
  &-warning {
    background-color: $Y200;
    color: $N500;
  }
  &-danger {
    background-color: $R300;
    color: $N0;
  }
  &-success {
    background-color: $G300;
    color: $N0;
  }
  &-info {
    background-color: $T300;
    color: $N0;
  }
}
</style>
