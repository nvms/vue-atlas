<template>
    <div :class="`${prefixCls}-affix`" :style="affixStyle">
        <slot/>
    </div>
</template>

<script>

  export default {
    name: 'VaAffix',
    props: {
      offset: {
        type: [Number, String],
        default: 0,
        required: false,
        note: 'Vertical offset distance to affix to'
      },
      prefixCls: {
        type: String,
        default: 'va'
      }
    },
    computed: {
      affixStyle() {
        return {
          top: `${this.offset}px`
        }
      }
    }
  }
</script>
