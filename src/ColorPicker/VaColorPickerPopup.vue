<template>
  <div ref="popup" v-show="show" :style="styleObj">
    popup
  </div>
</template>

<script>
export default {
  name: 'VaColorPickerPopup',
  props: {
    color: {
      type: String
    },
    show: {
      type: Boolean,
      default: false
    },
    pickerPosition: {
      type: Object
    },
    classPrefix: {
      type: String,
      default: 'va'
    }
  },
  mounted () {
    const $body = document.querySelector('body')
    $body.appendChild(this.$refs.popup)
  },
  beforeDestroy () {
    const $body = document.querySelector('body')
    $body.removeChild(this.$refs.popup)
  },
  computed: {
    styleObj () {
      let style = {}
      let pos = this.pickerPosition

      style['position'] = 'absolute'
      style['z-index'] = '9999'
      style['top'] = (pos.top + pos.height) + 3 + 'px'
      style['left'] = (pos.left - 30) + 'px'

      style['width'] = '100px'
      style['background'] = '#F4F5F7'
      // style['border'] = '2px solid #DFE1E5'
      style['border-radius'] = '3px'
      style['padding'] = '20px'
      style['text-align'] = 'center'

      return style
    }
  }
}
</script>
