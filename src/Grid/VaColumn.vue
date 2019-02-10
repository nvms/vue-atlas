<template>
  <div :class="classObj">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VaColumn',
  props: {
    xs: Number,
    sm: Number,
    md: Number,
    lg: Number,
    classPrefix: {
      type: String,
      default: 'va'
    }
  },
  computed: {
    classObj () {
      let {classPrefix} = this

      return [
        `${classPrefix}-col`,
        {
          [`${classPrefix}-col-xs-${this.xs}`]: this.xs,
          [`${classPrefix}-col-sm-${this.sm}`]: this.sm,
          [`${classPrefix}-col-md-${this.md}`]: this.md,
          [`${classPrefix}-col-lg-${this.lg}`]: this.lg
        }
      ]
    }
  }
}
</script>
