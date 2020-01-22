<template>
  <div class="wrap" :style="{width: width || '100%'}">
    <input
      ref="range"
      class="va-range"
      :value="currentValue"
      type="range"
      :name="name"
      :min="min"
      :max="max"
      :step="step"
      @input="onInput"
    >
    <transition name="fade">
      <div v-if="showoutput" class="output_position">
        <output for="r"/>
      </div>
    </transition>
  </div>
</template>

<script>
import events from '../utils/events'
import EventListener from '../utils/EventListener.js'

export default {
  name: 'VaRange',
  mixins: [events],
  props: {
    name: {
      type: String
    },
    min: {
      type: [String, Number],
      default: '0',
      required: false
    },
    max: {
      type: [String, Number],
      default: '100',
      required: false
    },
    step: {
      type: [String, Number],
      default: '1',
      required: false
    },
    value: {
      type: [Number, String],
      default: 0,
      required: false
    },
    width: {
      type: String
    }
  },
  data () {
    const value = this.value
    return {
      showoutput: false,
      currentValue: value,
      preBarElement: null,
      isMobile: false
    }
  },
  watch: {
    currentValue (val) {
      this.$emit('input', val)
      this.$emit('change', val)
      this.update()
    },
    value (val) {
      this.currentValue = parseInt(val)
    },
    min () {
      this.update()
    },
    max () {
      this.update()
    },
    step () {
      this.update()
    }
  },
  methods: {
    update () {
      this.preBarElement.style.width = this.getVal() + 'px'
    },
    onInput (e) {
      this.currentValue = parseInt(e.target.value)
      this.$emit('input', parseInt(e.target.value))
    },
    getVal () {
      if (!this.$refs.range) return
      var w = parseInt(this.$refs.range.clientWidth, 10)
      let cv = parseInt(this.currentValue, 10)
      let min = parseInt(this.min, 10)
      let max = parseInt(this.max, 10)

      /**
       *  I wonder if there's a way to figure out the width of the runnable track..
       *  Right now, we listen for isMobile from App.
       *  Width is 16px on desktop, 28px on mobile.
       */

      let thumbWidth
      this.isMobile ? (thumbWidth = 28) : (thumbWidth = 16)

      max = max - min
      cv = cv - min
      min = min - min

      if (min === 0 && max === 100) {
        return (cv * w) / 100 - (cv * thumbWidth) / 100 // because the thumb is 16px wide
      } else {
        const p = (cv * 100) / max
        let pp = (p * w) / 100
        pp = pp - (p * thumbWidth) / 100

        return pp
      }
    },
    init () {
      var wrp = document.createElement('div')
      var preBar = document.createElement('p')

      wrp.className = 'va-range-barCnt'
      preBar.className = 'va-range-preBar'

      this.$refs.range.className = this.$refs.range.className.length
        ? this.$refs.range.className + ' colorized'
        : 'colorized'
      this.$refs.range.parentNode.replaceChild(wrp, this.$refs.range)

      wrp.appendChild(this.$refs.range)
      wrp.appendChild(preBar)

      const r = this.$refs.range
      this._inputEvent = EventListener.listen(r, 'input', () => {
        preBar.style.width = this.getVal() + 'px'
      })

      this.$nextTick(() => {
        preBar.style.width = this.getVal() + 'px'
      })

      this.$refs.range.value = this.value
      this.preBarElement = preBar
    },
    _resizeEvent () {
      this.update()
    }
  },
  computed: {
    styleObj () {
      const style = {}

      const l = this.value - this.min
      const r = this.max - this.min

      style['transform'] = 'translate(calc(' + l / r + ' * 11.25em - 50%))'

      return style
    }
  },
  created () {
    this.$on('Va@rangeIsMobile', val => {
      if (val === true) {
        this.isMobile = true
      } else {
        this.isMobile = false
      }
    })
    this.dispatch('VaApp', 'Va@requestIsMobile', true)
  },
  mounted () {
    this.init()
    window.addEventListener('resize', this._resizeEvent, false)
  },
  beforeDestroy () {
    if (this._inputEvent) this._inputEvent.remove()
    if (this._mouseupEvent) this._mouseupEvent.remove()
    if (this._mousedownEvent) this._mousedownEvent.remove()

    /**
     * This event was not created using EventListener.
     */
    window.removeEventListener('resize', this._resizeEvent, false)
  }
}
</script>

<style lang="scss" src="../style/_reset.scss" scoped></style>
<style lang="scss">
@import "../variables";

.va-range-barCnt {
  position: relative;
  height: 10px;
  padding: 5px 0px;
}

.va-range-barCnt .va-range-preBar {
  position: absolute;
  background-color: $B400;
  height: 5px;
  line-height: 5px;
  z-index: 200;
  border-radius: 3px;
  padding: 0px;
  margin: 0px;
  pointer-events: none;
}

input[type='range'].va-range.colorized {
  -webkit-appearance: none;
  width: 100%;
  height: 5px;
  position: absolute;
  padding: 0px;
  margin: 0px;
  cursor: default;
  z-index: 100;
  left: 0px;
}

input[type='range'].va-range.colorized::-webkit-slider-runnable-track {
  height: 5px;
  background: $N30;
  border: none;
  border-radius: 3px;
}

input[type='range'].va-range.colorized::-webkit-slider-thumb {
  -webkit-appearance: none;
  position: relative;
  z-index: 201 !important;
  border: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: white;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.31) 0px 0px 3px 1px;
  margin-top: -5px;
}

@media (max-width: 768px) {
  input[type='range'].va-range.colorized::-webkit-slider-thumb {
    height: 28px;
    width: 28px;
    margin-top: -12px;
  }
  .va-range-barCnt {
    margin-top: 14px;
    height: 28px;
    line-height: 28px;
  }
  .va-range-barCnt .va-range-preBar {
    height: 7px;
    line-height: 7px;
  }
}

input[type='range'].va-range.colorized:focus {
  outline: none;
}

input[type='range'].va-range.colorized:focus::-webkit-slider-thumb {
  box-shadow: 0 0 1px 2px rgb(11, 66, 175),
    0 7px 12px -3px rgba(9, 30, 66, 0.25);
}

input[type='range'].va-range.colorized:focus::-webkit-slider-runnable-track {
  background: $N30;
}

input[type='range'].va-range.colorized::-moz-range-track {
  width: 100%;
  height: 5px;
  background: $N30;
  border: none;
  border-radius: 3px;
}

input[type='range'].va-range.colorized::-moz-range-thumb {
  border: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: white;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.31) 0px 0px 3px 1px;
  z-index: 400;
}

input[type='range'].va-range.colorized::-moz-focus-outer {
  border: 0;
}

input[type='range'].va-range.colored:focus::-moz-range-thumb {
  box-shadow: 0 0 1px 2px rgb(11, 66, 175),
    0 7px 12px -3px rgba(9, 30, 66, 0.25);
}
</style>
