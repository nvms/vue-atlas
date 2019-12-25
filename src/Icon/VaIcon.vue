<template>
  <i
    :class="[fontStyle, 'fa-' + type]"
    :style="{fontSize:size,color:color,margin:margin,backgroundColor:bgColor,borderRadius:'4px',padding:padding}"
  >
    <slot/>
  </i>
</template>

<script>
export default {
  name: 'VaIcon',
  props: {
    type: {
      type: String,
      required: true
    },
    iconStyle: {
      type: String,
      default: 'solid',
      required: false,
      validator (v) {
        return ['solid', 'regular', 'brands'].includes(v)
      }
    },
    size: {
      type: String,
      required: false,
      default: '1em'
    },
    color: {
      type: String,
      required: false
    },
    bgColor: {
      type: String,
      default: 'transparent',
      required: false
    },
    margin: {
      type: String,
      default: '0px',
      required: false
    },
    padding: {
      type: String,
      default: '0px',
      required: false
    },
    classPrefix: {
      type: String,
      default: 'va'
    }
  },
  computed: {
    fontStyle () {
      switch (this.iconStyle) {
        case 'regular':
          return 'far'
        case 'solid':
          return 'fas'
        case 'brands':
          return 'fab'
        default:
          return 'fas'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/_reset.scss";
</style><style lang="scss">
@import "../variables";
@import "../style/font";
</style>
