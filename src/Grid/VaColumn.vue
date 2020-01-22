<template>
  <div :class="classObj">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'VaColumn',
  props: {
    xs: Number,
    sm: Number,
    md: Number,
    lg: Number
  },
  computed: {
    classObj () {
      return [
        'va-col',
        {
          [`va-col-xs-${this.xs}`]: this.xs,
          [`va-col-sm-${this.sm}`]: this.sm,
          [`va-col-md-${this.md}`]: this.md,
          [`va-col-lg-${this.lg}`]: this.lg
        }
      ]
    }
  }
}
</script>
