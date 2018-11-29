<template>
  <div :class="classObj">
    <div :class="headerClassObj" :style="headerStyleObj" v-if="hasHeaderData">
      <div :class="`${prefixCls}-card-header-inner`">
        <div :class="`${prefixCls}-card-header-inner-left`"><slot name="left" /></div>
        <div :class="`${prefixCls}-card-header-inner-right`"><slot name="right" /></div>
      </div>
    </div>
    <div :style="bodyStyleObj">
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
      default: 1,
      validator (v) {
        v = v.toString()
        return ['0', '1', '2', '3', '4', '5'].includes(v)
      },
      note: 'Defines the size of the box-shadow on the card to give the illusion of distance from the canvas.'
    },
    padding: {
      type: [Number, String],
      default: 10,
      note: 'A convenience prop to help define the card\'s inner padding.'
    },
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  computed: {
    classObj () {
      let {prefixCls, elevation} = this
      let klass = {}

      klass[prefixCls + '-card'] = true
      klass[prefixCls + '-card-elevation-' + elevation] = true

      return klass
    },
    bodyStyleObj () {
      let {padding} = this
      let style = {}

      style['padding'] = padding + 'px'

      return style
    },
    headerClassObj () {
      let {prefixCls} = this
      let klass = {}

      klass[prefixCls + '-card-header'] = true

      return klass
    },
    headerStyleObj () {
      let {padding} = this
      let style = {}

      style['padding-left'] = padding + 'px'
      style['padding-right'] = padding + 'px'

      return style
    },
    hasHeaderData () {
      return this.$slots.left || this.$slots.right
    }
  }
}
</script>
