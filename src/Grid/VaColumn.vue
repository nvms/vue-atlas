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
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  computed: {
    classObj () {
      let {prefixCls} = this

      return [
        `${prefixCls}-col`,
        {
          [`${prefixCls}-col-xs-${this.xs}`]: this.xs,
          [`${prefixCls}-col-sm-${this.sm}`]: this.sm,
          [`${prefixCls}-col-md-${this.md}`]: this.md,
          [`${prefixCls}-col-lg-${this.lg}`]: this.lg
        }
      ]
    }
  }
}
</script>
