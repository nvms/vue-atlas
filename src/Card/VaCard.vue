<template>
  <div :class="classObj">
    <div :class="headerClassObj" :style="headerStyleObj" v-if="hasHeaderData">
      <div :class="`${classPrefix}-card-header-inner`">
        <div :class="`${classPrefix}-card-header-inner-left`"><slot name="topLeft" /></div>
        <div :class="`${classPrefix}-card-header-inner-right`"><slot name="topRight" /></div>
      </div>
    </div>
    <div :style="bodyStyleObj" :class="`${classPrefix}-card-body`">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VaCard',
  props: {
    elevation: {
      type: [Number, String],
      default: 0,
      validator (v) {
        v = v.toString()
        return ['0', '1', '2', '3', '4', '5'].includes(v)
      }
    },
    padding: {
      type: [Number, String],
      default: '10px'
    },
    classPrefix: {
      type: String,
      default: 'va'
    }
  },
  computed: {
    classObj () {
      let {classPrefix, elevation} = this
      let classes = {}

      classes[classPrefix + '-card'] = true
      classes[classPrefix + '-card-elevation-' + elevation] = true

      return classes
    },
    bodyStyleObj () {
      let {padding} = this
      let style = {}

      style['padding'] = padding

      return style
    },
    headerClassObj () {
      let {classPrefix} = this
      let classes = {}

      classes[classPrefix + '-card-header'] = true

      return classes
    },
    headerStyleObj () {
      let {padding} = this
      let style = {}

      style['padding-left'] = padding
      style['padding-right'] = padding

      return style
    },
    hasHeaderData () {
      return this.$slots.topLeft || this.$slots.topRight
    }
  }
}
</script>
