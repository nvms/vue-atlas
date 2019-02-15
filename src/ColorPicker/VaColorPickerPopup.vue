<template>
  <transition name="fadeDown">
    <div
      ref="popup"
      :class="`${classPrefix}-color-picker-popup`">
      <div
        :class="`${classPrefix}-color-picker-upper`">
        <div
          ref="gradient"
          :style="gradientStyleObj"
          @mousedown="gradientOnMousedown"
          :class="`${classPrefix}-color-picker-gradient`">
          <div
            :class="`${classPrefix}-color-picker-gradient-white`" />
          <div
            :class="`${classPrefix}-color-picker-gradient-black`" />
          <div
            :class="`${classPrefix}-color-picker-border`" />
          <div
            ref="gradientCursor"
            :class="`${classPrefix}-color-picker-gradient-cursor`" />
        </div>
        <div
          ref="hue"
          @mousedown="hueSliderOnMousedown"
          :class="`${classPrefix}-color-picker-hue-track`">
          <div
            :class="`${classPrefix}-color-picker-border`" />
          <div
            ref="hueCursor"
            :class="`${classPrefix}-color-picker-hue-cursor`" />
        </div>
        <div
          ref="alpha"
          @mousedown="alphaSliderOnMousedown"
          :class="`${classPrefix}-color-picker-alpha-track`">
          <div
            :style="alphaStyleObj"
            :class="`${classPrefix}-color-picker-alpha-track-color`" />
          <div
            :class="`${classPrefix}-color-picker-border`" />
          <div
            ref="alphaCursor"
            :class="`${classPrefix}-color-picker-alpha-cursor`" />
        </div>
      </div>
      <div
        :class="`${classPrefix}-color-picker-lower`">
        <va-input
          size="xs"
          v-model="hex"
          @change="hexChange"
          width="68px" />
        <va-input
          size="xs"
          v-model="rgb.r"
          @change="rChange"
          width="38px" />
        <va-input
          size="xs"
          v-model="rgb.g"
          @change="gChange"
          width="38px" />
        <va-input
          size="xs"
          v-model="rgb.b"
          @change="bChange"
          width="38px" />
        <va-input
          size="xs"
          v-model="alpha"
          @change="aChange"
          width="40px" />
      </div>
      <div
        :class="`${classPrefix}-color-picker-lower`" style="margin:0;color:#999;">
        <span style="text-align:center;width:68px;font-size:10px;">HEX</span>
        <span style="text-align:center;width:38px;font-size:10px;">R</span>
        <span style="text-align:center;width:38px;font-size:10px;">G</span>
        <span style="text-align:center;width:38px;font-size:10px;">B</span>
        <span style="text-align:center;width:38px;font-size:10px;">A</span>
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
    classPrefix: {
      type: String,
      default: 'va'
    }
  },
  data () {
    return {
      gradientPosition: {},
      hueSliderPosition: {},
      alphaSliderPosition: {},
      cursorOffsetLeft: 5,
      cursorOffsetTop: 5,
      alpha: 1,
      hsb: {
        h: 0,
        s: 0,
        b: 0
      },
      rgb: {
        r: 255,
        g: 255,
        b: 255
      },
      hex: '',
      x: 0,
      y: 0
    }
  },
  mounted () {
    this.hex = this.color
    this.hsb = hexToHsb(this.hex)
    this.rgb = hsbToRgb(this.hsb)

    this.emitColors()
  },
  computed: {
    gradientStyleObj () {
      let {hsb, alpha} = this
      let style = {}

      style['background'] = 'hsl('+ hsb.h + ', 100%, 50%, ' + alpha + ')'

      return style
    },
    alphaStyleObj () {
      let {hsb} = this
      let style = {}

      style['background'] = 'linear-gradient(180deg, hsl('+ hsb.h + ', 100%, 50%, 0), hsl('+ hsb.h + ', 100%, 50%, 1))'

      return style
    }
  },
  methods: {
    doShow () {
      setTimeout(() => {
        this.hsb = hexToHsb(this.hex)
        this.updateControls()
      }, 50)
    },
    emitColors () {
      let colorsToEmit = {
        rgb: this.rgb,
        rgba: {
          r: this.rgb.r,
          g: this.rgb.g,
          b: this.rgb.b,
          a: this.alpha
        },
        hex: this.hex,
        hsb: this.hsb
      }

      this.$emit('change', colorsToEmit)
    },
    rChange (e) {
      let rgb = {r:e, g:this.rgb.g, b:this.rgb.b}
      this.hsb = rgbToHsb(rgb)
      this.hex = hsbToHex(rgbToHsb(rgb))
      this.updateControls()
    },
    gChange (e) {
      let rgb = {r:this.rgb.r, g:e, b:this.rgb.b}
      this.hsb = rgbToHsb(rgb)
      this.hex = hsbToHex(rgbToHsb(rgb))
      this.updateControls()
    },
    bChange (e) {
      let rgb = {r:this.rgb.r, g:this.rgb.g, b:e}
      this.hsb = rgbToHsb(rgb)
      this.hex = hsbToHex(rgbToHsb(rgb))
      this.updateControls()
    },
    aChange (e) {
      this.updateControls()
    },
    hexChange (e) {
      this.hsb = hexToHsb(e)
      this.rgb = hsbToRgb(this.hsb)
      this.updateControls()
    },
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
    selectGradientColor () {
      this.hsb.s = (this.x / this.gradientPosition.width * 100)
      this.hsb.b = 100 - (this.y / this.gradientPosition.height) * 100

      this.rgb = hsbToRgb(this.hsb)
      this.hex = rgbToHex(this.rgb)

      this.emitColors()
    },
    makeGradientSelection (e) {

      /**
       * the offset for where the cursor appears in
       * relation to the system cursor.
       */
      let cursorOffsetArrowLeft = 1
      let cursorOffsetArrowTop = 2

      /**
       * absolute x and y position of the system cursor
       * in relation to the gradient
       */
      let arrowx = e.clientX - this.gradientPosition.left - cursorOffsetArrowLeft
      let arrowy = e.clientY - this.gradientPosition.top - cursorOffsetArrowTop

      /**
       * absolute x and y position of the system cursor
       * in relation to the gradient, clamped within gradient bounds
       */
      let x = arrowx - this.cursorOffsetLeft
      let y = arrowy - this.cursorOffsetTop

      /**
       * clamp
       */
      if (x < 0 - this.cursorOffsetLeft) x = 0 - this.cursorOffsetLeft
      if (x > this.gradientPosition.width - this.cursorOffsetLeft) x = this.gradientPosition.width - this.cursorOffsetLeft

      if (y < 0 - this.cursorOffsetTop) y = 0 - this.cursorOffsetTop
      if (y > this.gradientPosition.height - this.cursorOffsetTop) y = this.gradientPosition.height - this.cursorOffsetTop

      /**
       * place the cursor, taking note that x and y are still affected
       * by cursorOffsetLeft and cursorOffsetTop.. we need to adjust before
       * actually figuring out the color
       */
      this.$refs.gradientCursor.style.top = y + 'px'
      this.$refs.gradientCursor.style.left = x + 'px'

      x += this.cursorOffsetLeft
      y += this.cursorOffsetTop

      this.x = x
      this.y = y

      this.selectGradientColor()
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
    },

    updateControls () {
      this.setHueSliderPositionFromHsb()
      this.setAlphaSliderPositionFromAlpha()
      this.setGradientCursorPositionFromHsb()
      this.emitColors()
    },

    makeHueSelection (e) {
      let cursorOffsetArrowTop = 2
      /**
       * absolute y position of the system cursor
       * in relation to the hue track
       */
      let arrowy = e.clientY - this.hueSliderPosition.top - cursorOffsetArrowTop

      /**
       * absolute y position of the system cursor
       * in relation to the hue track, clamped within the track
       */
      let y = arrowy - this.cursorOffsetTop

      /**
       * clamp
       */
      if (y < 0 - this.cursorOffsetTop) y = 0 - this.cursorOffsetTop
      if (y > this.hueSliderPosition.height - this.cursorOffsetTop) y = this.hueSliderPosition.height - this.cursorOffsetTop

      /**
       * place the cursor, taking note that y is still affected
       * by cursorOffsetTop.. we need to adjust before
       * actually figuring out the color
       */
      this.$refs.hueCursor.style.top = y + 'px'

      y += this.cursorOffsetTop

      this.hsb.h = (y / this.hueSliderPosition.height) * 360

      this.selectGradientColor()
    },
    setAlphaSliderPositionFromAlpha () {
      this.alphaSliderPosition = this.getElementRect(this.$refs.alpha)
      this.$refs.alphaCursor.style.top = (this.alpha * this.alphaSliderPosition.height - this.cursorOffsetTop) + 'px'
    },
    setHueSliderPositionFromHsb () {
      this.$refs.hueCursor.style.top = this.hsb.h / 2 + 'px'
    },
    setGradientCursorPositionFromHsb () {
      this.gradientPosition = this.getElementRect(this.$refs.gradient)

      /**
       * find where it needs to be in the x
       */
      let left = (((this.hsb.s * this.gradientPosition.width) / 100) - this.cursorOffsetLeft)
      this.x = left
      this.$refs.gradientCursor.style.left = left + 'px'
      this.x += this.cursorOffsetLeft

      /**
       * find where it needs to be in the y
       */
      let top = this.hsb.b - 100
      
      if (top < 0) {
        top *= -1
      }

      top = ((top * this.gradientPosition.height) / 100) - this.cursorOffsetTop

      this.y = top
      this.$refs.gradientCursor.style.top = top + 'px'
      this.y += this.cursorOffsetTop
    },
    hueSliderOnMousedown (e) {
      this.prevent(e)
      this.hueSliderPosition = this.getElementRect(this.$refs.hue)
      this.makeHueSelection(e)

      // set hooks
      window.addEventListener('mousemove', this.hueSliderOnMousemove, false)
      window.addEventListener('mouseup', this.hueSliderOnMouseup, false)
    },
    hueSliderOnMousemove (e) {
      this.makeHueSelection(e)
    },
    hueSliderOnMouseup (e) {
      // remove hooks
      window.removeEventListener('mouseup', this.hueSliderOnMouseup, false)
      window.removeEventListener('mousemove', this.hueSliderOnMousemove, false)
    },


    makeAlphaSelection (e) {
      let cursorOffsetArrowTop = 2
      /**
       * absolute y position of the system cursor
       * in relation to the alpha track
       */
      let arrowy = e.clientY - this.alphaSliderPosition.top - cursorOffsetArrowTop

      /**
       * absolute y position of the system cursor
       * in relation to the alpha track, clamped within the track
       */
      let y = arrowy - this.cursorOffsetTop

      /**
       * clamp
       */
      if (y < 0 - this.cursorOffsetTop) y = 0 - this.cursorOffsetTop
      if (y > this.alphaSliderPosition.height - this.cursorOffsetTop) y = this.alphaSliderPosition.height - this.cursorOffsetTop
      /**
       * place the cursor, taking note that x and y are still affected
       * by cursorOffsetLeft and cursorOffsetTop.. we need to adjust before
       * actually figuring out the color
       */
      this.$refs.alphaCursor.style.top = y + 'px'

      y += this.cursorOffsetTop

      this.alpha = ((y / this.alphaSliderPosition.height) * 100) / 100

      this.selectGradientColor()
    },
    alphaSliderOnMousedown (e) {
      this.prevent(e)
      this.alphaSliderPosition = this.getElementRect(this.$refs.alpha)
      this.makeAlphaSelection(e)

      // set hooks
      window.addEventListener('mousemove', this.alphaSliderOnMousemove, false)
      window.addEventListener('mouseup', this.alphaSliderOnMouseup, false)
    },
    alphaSliderOnMousemove (e) {
      this.makeAlphaSelection(e)
    },
    alphaSliderOnMouseup (e) {
      // remove hooks
      window.removeEventListener('mouseup', this.alphaSliderOnMouseup, false)
      window.removeEventListener('mousemove', this.alphaSliderOnMousemove, false)
    }
  }
}
</script>
