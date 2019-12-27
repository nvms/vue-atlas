<template>
  <div class="va-affix" :style="affixStyle">
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
      required: false
    }
  },
  computed: {
    affixStyle () {
      return {
        top: `${this.offset}px`
      }
    }
  }
}
</script>

<style lang="scss" src="../style/_reset.scss" scoped></style>
<style lang="scss">
.va-affix {
  position: sticky;
  z-index: 900;
}
</style>
