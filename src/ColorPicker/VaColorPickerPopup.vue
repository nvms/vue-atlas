<template>
  <transition name="fadeDown">
    <div
      ref="popup"
      v-show="show"
      :style="styleObj"
      :class="`${classPrefix}-color-picker-popup`">
      <div
        :class="`${classPrefix}-color-picker-upper`">
        <div
          ref="gradient"
          @mousedown="gradientOnMousedown"
          :class="`${classPrefix}-color-picker-gradient`">
          <div
            :class="`${classPrefix}-color-picker-gradient-white`" />
          <div
            :class="`${classPrefix}-color-picker-gradient-black`" />
          <div
            :class="`${classPrefix}-color-picker-border`" />
          <div
            ref="cursor"
            :class="`${classPrefix}-color-picker-gradient-cursor`" />
        </div>
        <div
          ref="hue"
          :class="`${classPrefix}-color-picker-hue-slider`">
          <div
            :class="`${classPrefix}-color-picker-border`" />
        </div>
        <div
          ref="alpha"
          :class="`${classPrefix}-color-picker-alpha-slider`">
          <div
            :class="`${classPrefix}-color-picker-alpha-slider-color`" />
          <div
            :class="`${classPrefix}-color-picker-border`" />
        </div>
      </div>
      <div
        :class="`${classPrefix}-color-picker-lower`">
        <va-input
          size="xs"
          width="70px" />
        <va-input
          size="xs"
          width="38px" />
        <va-input
          size="xs"
          width="38px" />
        <va-input
          size="xs"
          width="38px" />
        <va-input
          size="xs"
          width="38px" />
      </div>
    </div>
  </transition>
</template>

<script>
import {
  rgbToHsb,
  rgbToHex,
  hsbToRgb,
  hexToHsb,
  hsbToHex,
  rgbStringToObject
} from './conversions'

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
  data () {
    return {
      gradientPosition: {}
    }
  },
  mounted () {
    const $body = document.querySelector('body')
    $body.appendChild(this.$refs.popup)

    console.log('rgbStringToObject(\'rgb(250, 132, 14)\')', rgbStringToObject('rgb(250, 132, 14)'))
    console.log('hex should be #fa840e')
    console.log('hex to hsb: ', hexToHsb('#fa840e'))

    let hsb = rgbToHsb({r:250, g:132, b:14})
    console.log('hsb: ', hsb)
    console.log('hsb to hex: ', hsbToHex(hsb))

    let rgb = hsbToRgb(hsb)
    console.log('rgb: ', rgb)

    console.log('rgb to hex: ', rgbToHex(rgb))
  },
  beforeDestroy () {
    const $body = document.querySelector('body')
    $body.removeChild(this.$refs.popup)
  },
  computed: {
    styleObj () {
      let style = {}
      let pos = this.pickerPosition

      style['top'] = (pos.top + pos.height) + 3 + 'px'
      style['left'] = (pos.left - 30) + 'px'

      return style
    }
  },
  methods: {
    prevent (e) {
      if (e.stopPropagation) {
        e.stopPropagation()
      }
      if (e.preventDefault) {
        e.preventDefault()
      }
      e.cancelBubble = true
      e.returnValue = false
    },
    getElementRect (el) {
      let rect = el.getBoundingClientRect()
      return {
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        x: rect.x,
        y: rect.y
      }
    },
    makeGradientSelection (e) {
      let cursorOffsetLeft = 3
      let cursorOffsetTop = 4

      let t = e.clientY - this.gradientPosition.top - cursorOffsetTop
      let l = e.clientX - this.gradientPosition.left - cursorOffsetLeft

      let x = l - cursorOffsetLeft
      let y = t - cursorOffsetTop

      /**
       * clamp x and y
       */
      if (x < 0 - cursorOffsetLeft) x = 0 - cursorOffsetLeft
      if (x > this.gradientPosition.width - cursorOffsetLeft) x = this.gradientPosition.width - cursorOffsetLeft

      if (y < 0 - cursorOffsetTop) y = 0 - cursorOffsetTop
      if (y > this.gradientPosition.height - cursorOffsetTop) y = this.gradientPosition.height - cursorOffsetTop

      /**
       * x and y are clamped between 0 and the width/height of the gradient
       * l(eft) and t(op) are the actual position of the cursor in relation to the gradient
       */
      this.$refs.cursor.style.top = y + 'px'
      this.$refs.cursor.style.left = x + 'px'
    },
    gradientOnMousedown (e) {
      this.prevent(e)
      this.gradientPosition = this.getElementRect(this.$refs.gradient)
      this.makeGradientSelection(e)

      // set hooks
      window.addEventListener('mousemove', this.gradientOnMousemove, false)
      window.addEventListener('mouseup', this.gradientOnMouseup, false)
    },
    gradientOnMousemove (e) {
      this.makeGradientSelection(e)
    },
    gradientOnMouseup (e) {
      // remove hooks
      window.removeEventListener('mouseup', this.gradientOnMouseup, false)
      window.removeEventListener('mousemove', this.gradientOnMousemove, false)
    }
  }
}
</script>
