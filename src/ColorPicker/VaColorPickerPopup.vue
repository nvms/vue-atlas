<template>
  <transition name="fadeDown">
    <div ref="popup" class="va-color-picker-popup">
      <div class="va-color-picker-upper">
        <div
          ref="gradient"
          :style="gradientStyleObj"
          @mousedown="gradientOnMousedown"
          @touchstart="gradientOnMousedown"
          class="va-color-picker-gradient"
        >
          <div class="va-color-picker-gradient-white"/>
          <div class="va-color-picker-gradient-black"/>
          <div class="va-color-picker-border"/>
          <div
            ref="gradientCursor"
            class="va-color-picker-gradient-cursor"
          />
        </div>
        <div
          ref="hue"
          @mousedown="hueSliderOnMousedown"
          @touchstart="hueSliderOnMousedown"
          class="va-color-picker-hue-track"
        >
          <div class="va-color-picker-border"/>
          <div
            ref="hueCursor"
            class="va-color-picker-hue-cursor"
          />
        </div>
        <div
          ref="alpha"
          @mousedown="alphaSliderOnMousedown"
          @touchstart="alphaSliderOnMousedown"
          class="va-color-picker-alpha-track"
          v-if="!hideAlpha"
        >
          <div
            :style="alphaStyleObj"
            class="va-color-picker-alpha-track-color"
            v-if="!hideAlpha"
          />
          <div class="va-color-picker-border"/>
          <div v-if="!hideAlpha"
            ref="alphaCursor"
            class="va-color-picker-alpha-cursor"
          />
        </div>
      </div>
      <div class="va-color-picker-lower">
        <va-input size="xs" v-model="hex" @change="hexChange" width="68px"/>
        <va-input size="xs" v-model="rgb.r" @change="rChange" width="38px"/>
        <va-input size="xs" v-model="rgb.g" @change="gChange" width="38px"/>
        <va-input size="xs" v-model="rgb.b" @change="bChange" width="38px"/>
        <va-input size="xs" v-model="alpha" @change="aChange" width="40px" v-if="!hideAlpha"/>
      </div>
      <div
        class="va-color-picker-lower"
        style="margin:0;color:#999;"
      >
        <span style="text-align:center;width:68px;font-size:10px;">HEX</span>
        <span style="text-align:center;width:38px;font-size:10px;">R</span>
        <span style="text-align:center;width:38px;font-size:10px;">G</span>
        <span style="text-align:center;width:38px;font-size:10px;">B</span>
        <span style="text-align:center;width:38px;font-size:10px;" v-if="!hideAlpha">A</span>
      </div>
    </div>
  </transition>
</template>

<script>
import { rgbToHsb, rgbToHex, hsbToRgb, hexToHsb, hsbToHex } from './conversions'

export default {
  name: 'VaColorPickerPopup',
  props: {
    color: {
      type: String
    },
    hideAlpha: {
      type: Boolean,
      default: false
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
      const { hsb, alpha } = this
      const style = {}

      style['background'] = 'hsl(' + hsb.h + ', 100%, 50%, ' + alpha + ')'

      return style
    },
    alphaStyleObj () {
      const { hsb } = this
      const style = {}

      style['background'] =
        'linear-gradient(180deg, hsl(' +
        hsb.h +
        ', 100%, 50%, 0), hsl(' +
        hsb.h +
        ', 100%, 50%, 1))'

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
      const colorsToEmit = {
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
      const rgb = { r: e, g: this.rgb.g, b: this.rgb.b }
      this.hsb = rgbToHsb(rgb)
      this.hex = hsbToHex(rgbToHsb(rgb))
      this.updateControls()
    },
    gChange (e) {
      const rgb = { r: this.rgb.r, g: e, b: this.rgb.b }
      this.hsb = rgbToHsb(rgb)
      this.hex = hsbToHex(rgbToHsb(rgb))
      this.updateControls()
    },
    bChange (e) {
      const rgb = { r: this.rgb.r, g: this.rgb.g, b: e }
      this.hsb = rgbToHsb(rgb)
      this.hex = hsbToHex(rgbToHsb(rgb))
      this.updateControls()
    },
    aChange () {
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
      const rect = el.getBoundingClientRect()
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
      this.hsb.s = (this.x / this.gradientPosition.width) * 100
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
      const cursorOffsetArrowLeft = 1
      const cursorOffsetArrowTop = 2

      /**
       * absolute x and y position of the system cursor
       * in relation to the gradient
       */
      var arrowx = ''
      var arrowy = ''

      if (e.clientX && e.clientY) {
        arrowx = e.clientX - this.gradientPosition.left - cursorOffsetArrowLeft
        arrowy = e.clientY - this.gradientPosition.top - cursorOffsetArrowTop
      } else if (e.changedTouches !== undefined) {
        arrowx =
          e.changedTouches[0].clientX -
          this.gradientPosition.left -
          cursorOffsetArrowLeft
        arrowy =
          e.changedTouches[0].clientY -
          this.gradientPosition.top -
          cursorOffsetArrowTop
      }

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
      if (x > this.gradientPosition.width - this.cursorOffsetLeft) { x = this.gradientPosition.width - this.cursorOffsetLeft }

      if (y < 0 - this.cursorOffsetTop) y = 0 - this.cursorOffsetTop
      if (y > this.gradientPosition.height - this.cursorOffsetTop) { y = this.gradientPosition.height - this.cursorOffsetTop }

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

      window.addEventListener('touchmove', this.gradientOnMousemove, false)
      window.addEventListener('touchend', this.gradientOnMouseup, false)
    },
    gradientOnMousemove (e) {
      this.makeGradientSelection(e)
    },
    gradientOnMouseup () {
      // remove hooks
      window.removeEventListener('mouseup', this.gradientOnMouseup, false)
      window.removeEventListener('mousemove', this.gradientOnMousemove, false)

      window.removeEventListener('touchend', this.gradientOnMouseup, false)
      window.removeEventListener('touchmove', this.gradientOnMousemove, false)
    },

    updateControls () {
      this.setHueSliderPositionFromHsb()
      if (!this.hideAlpha) this.setAlphaSliderPositionFromAlpha()
      this.setGradientCursorPositionFromHsb()
      this.emitColors()
    },

    makeHueSelection (e) {
      const cursorOffsetArrowTop = 2
      /**
       * absolute y position of the system cursor
       * in relation to the hue track
       */
      var arrowy = ''

      if (e.clientY) {
        arrowy = e.clientY - this.hueSliderPosition.top - cursorOffsetArrowTop
      } else if (e.changedTouches !== undefined) {
        arrowy =
          e.changedTouches[0].clientY -
          this.hueSliderPosition.top -
          cursorOffsetArrowTop
      }

      /**
       * absolute y position of the system cursor
       * in relation to the hue track, clamped within the track
       */
      let y = arrowy - this.cursorOffsetTop

      /**
       * clamp
       */
      if (y < 0 - this.cursorOffsetTop) y = 0 - this.cursorOffsetTop
      if (y > this.hueSliderPosition.height - this.cursorOffsetTop) { y = this.hueSliderPosition.height - this.cursorOffsetTop }

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
      this.$refs.alphaCursor.style.top =
        this.alpha * this.alphaSliderPosition.height -
        this.cursorOffsetTop +
        'px'
    },
    setHueSliderPositionFromHsb () {
      this.$refs.hueCursor.style.top = this.hsb.h / 2 + 'px'
    },
    setGradientCursorPositionFromHsb () {
      this.gradientPosition = this.getElementRect(this.$refs.gradient)

      /**
       * find where it needs to be in the x
       */
      const left =
        (this.hsb.s * this.gradientPosition.width) / 100 - this.cursorOffsetLeft
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

      top = (top * this.gradientPosition.height) / 100 - this.cursorOffsetTop

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

      window.addEventListener('touchmove', this.hueSliderOnMousemove, false)
      window.addEventListener('touchend', this.hueSliderOnMouseup, false)
    },
    hueSliderOnMousemove (e) {
      this.makeHueSelection(e)
    },
    hueSliderOnMouseup () {
      // remove hooks
      window.removeEventListener('mouseup', this.hueSliderOnMouseup, false)
      window.removeEventListener('mousemove', this.hueSliderOnMousemove, false)

      window.removeEventListener('touchend', this.hueSliderOnMouseup, false)
      window.removeEventListener('touchmove', this.hueSliderOnMousemove, false)
    },

    makeAlphaSelection (e) {
      const cursorOffsetArrowTop = 2
      /**
       * absolute y position of the system cursor
       * in relation to the alpha track
       */
      var arrowy = ''

      if (e.clientY) {
        arrowy = e.clientY - this.alphaSliderPosition.top - cursorOffsetArrowTop
      } else if (e.changedTouches !== undefined) {
        arrowy =
          e.changedTouches[0].clientY -
          this.alphaSliderPosition.top -
          cursorOffsetArrowTop
      }

      /**
       * absolute y position of the system cursor
       * in relation to the alpha track, clamped within the track
       */
      let y = arrowy - this.cursorOffsetTop

      /**
       * clamp
       */
      if (y < 0 - this.cursorOffsetTop) y = 0 - this.cursorOffsetTop
      if (y > this.alphaSliderPosition.height - this.cursorOffsetTop) { y = this.alphaSliderPosition.height - this.cursorOffsetTop }
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

      window.addEventListener('touchmove', this.alphaSliderOnMousemove, false)
      window.addEventListener('touchend', this.alphaSliderOnMouseup, false)
    },
    alphaSliderOnMousemove (e) {
      this.makeAlphaSelection(e)
    },
    alphaSliderOnMouseup () {
      // remove hooks
      window.removeEventListener('mouseup', this.alphaSliderOnMouseup, false)
      window.removeEventListener(
        'mousemove',
        this.alphaSliderOnMousemove,
        false
      )

      window.removeEventListener('touchend', this.alphaSliderOnMouseup, false)
      window.removeEventListener(
        'touchmove',
        this.alphaSliderOnMousemove,
        false
      )
    }
  }
}
</script>
