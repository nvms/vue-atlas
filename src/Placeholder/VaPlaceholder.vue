<template>
  <div :class="classObj">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VaPlaceholder',
  props: {
    rounded: {
      type: Boolean,
      default: false
    },
    centered: {
      type: Boolean,
      default: false
    },
    animated: {
      type: Boolean,
      default: false
    },
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  computed: {
    classObj () {
      let {prefixCls, rounded, centered, animated} = this
      let klass = {}

      klass[prefixCls + '-placeholder'] = true
      klass[prefixCls + '-placeholder-rounded'] = rounded
      klass[prefixCls + '-placeholder-centered'] = centered
      klass[prefixCls + '-placeholder-animated'] = animated

      return klass
    }
  }
}
</script>
