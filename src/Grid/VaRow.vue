<template>
  <div :class="`${prefixCls}-row`" :style="styles">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VaRow',
  props: {
    gutter: {
      type: Number,
      default: 0
    },
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  computed: {
    styles () {
      let ret = {}
      let half = Math.floor(this.gutter / 2)
      ret.marginLeft = ret.marginRight = `${-half}px`
      this.$nextTick(() => {
        this.$children.forEach((children) => {
          children.$el.style.paddingLeft = children.$el.style.paddingRight = `${half}px`
          children.$el.style.marginBottom = this.gutter + 'px'
        })
      })
      return ret
    }
  }
}
</script>
