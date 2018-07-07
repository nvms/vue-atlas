<template>
  <div :class="classObj" :style="styleObj">
    <slot />
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
    styleObj () {
      let {padding} = this
      let style = {}

      style['padding'] = padding + 'px'

      return style
    }
  }
}
</script>
