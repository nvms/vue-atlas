<template>
  <div :class="`${prefixCls}-timepicker`">
    <va-input
      v-if="!isMobile"
      :width="width"
      :name="name"
      :rules="rules"
      :placeholder="placeholder"
      :custom-validate="customValidate"
      :disabled="disabled"
      :readonly="readonly"
      @clean="clean"
      @click.native="inputClick"
      :show-clean="true"
      icon="clock"
      icon-style="regular"
      v-model="currentValue">
    </va-input>
    <va-input
      v-if="isMobile"
      :width="width"
      :name="name"
      :rules="rules"
      :placeholder="placeholder"
      :custom-validate="customValidate"
      :disabled="disabled"
      :readonly="readonly"
      :show-clean="true"
      type="time"
      v-model="currentValue">
    </va-input>
    <transition name="fadeDown">
      <div v-show="show" v-va-position="show" :class="`${prefixCls}-timepicker-popup`">
        <div v-if="hour" data-role="hour" :class="`${prefixCls}-timepicker-range-wrap`">
          <span>{{getL('hour')}}</span>
          <va-range :width="190" v-model="time.hour" :min="hourRange[0]" :max="hourRange[1]" :class="`${prefixCls}-timepicker-range`"></va-range>
        </div>
        <div v-if="minute" data-role="minute" :class="`${prefixCls}-timepicker-range-wrap`">
          <span>{{getL('minute')}}</span>
          <va-range :width="190" v-model="time.minute" :min="minuteRange[0]" :max="minuteRange[1]" :class="`${prefixCls}-timepicker-range`"></va-range>
        </div>
        <div v-if="second" data-role="second" :class="`${prefixCls}-timepicker-range-wrap`">
          <span>{{getL('second')}}</span>
          <va-range :width="190" v-model="time.second" :min="secondRange[0]" :max="secondRange[1]" :class="`${prefixCls}-timepicker-range`"></va-range>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import EventListener from '../utils/EventListener'
import inputMixin from '../Mixin/inputMixin'
import localeMixin from '../Mixin/localeMixin'

export default {
  name: 'VaTimepicker',
  mixins: [inputMixin, localeMixin('VaTimepicker')],
  props: {
    value: {
      type: String
    },
    format: {
      type: String,
      default: 'hh:mm:ss',
      required: false
    },
    hourRange: {
      type: Array,
      default () {
        return [0, 23]
      }
    },
    minuteRange: {
      type: Array,
      default () {
        return [0, 59]
      }
    },
    secondRange: {
      type: Array,
      default () {
        return [0, 59]
      }
    },
    readonly: {
      type: Boolean,
      default: false,
      required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  data () {
    return {
      isMobile: false,
      show: false,
      time: {
        hour: 0,
        minute: 0,
        second: 0
      },
      currentValue: this.value
    }
  },
  watch: {
    show (val) {
      if (!val) this.$emit('hide', this.currentValue)
    },
    value (val) {
      if (this.inner) {
        this.inner = false
        return
      }
      this.inner = true
      this.currentValue = val
    },
    currentValue (val) {
      if (this.inner) {
        this.inner = false
        return
      }
      this.inner = true
      this.$emit('input', val)
      this.$emit('change', val)
    },
    time: {
      deep: true,
      handler (val) {
        var ret = ''
        this.time.hour > this.hourRange[1] ? this.time.hour = this.hourRange[1] : 0
        this.time.minute > this.minuteRange[1] ? this.time.minute = this.minuteRange[1] : 0
        this.time.second > this.secondRange[1] ? this.time.second = this.secondRange[1] : 0
        this.time.hour < this.hourRange[0] ? this.time.hour = this.hourRange[0] : 0
        this.time.minute < this.minuteRange[0] ? this.time.minute = this.minuteRange[0] : 0
        this.time.second < this.secondRange[0] ? this.time.second = this.secondRange[0] : 0
        if (this.hour) {
          ret += this.fix(this.time.hour, 2) + ':'
        }
        if (this.minute) {
          ret += this.fix(this.time.minute, 2) + ':'
        }
        if (this.second) {
          ret += this.fix(this.time.second, 2) + ':'
        }
        ret = ret.substr(0, ret.length - 1)
        this.currentValue = ret
      }
    }
  },
  methods: {
    clean () {
      this.time = {
        hour: 0,
        minute: 0,
        second: 0
      }
      this.$nextTick(() => {
        this.currentValue = ''
      })
    },
    close () {
      this.show = false
    },
    inputClick () {
      if (this.disabled) return
      this.show = !this.show
    },
    fix (num, length) {
      num = parseInt(num)
      num = isNaN(num) ? 0 : num
      return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num
    },
    _format (str) {
      if (str) {
        var a = str.split(':')
        if (this.hour) {
          this.time.hour = parseInt(a[0] ? a[0] : 0)
        }
        if (this.minute) {
          this.time.minute = parseInt(a[1] ? a[1] : 0)
        }
        if (this.second) {
          this.time.second = parseInt(a[2] ? a[2] : 0)
        }
      }
    }
  },
  computed: {
    hour () {
      return this.format.indexOf('hh') > -1
    },
    minute () {
      return this.format.indexOf('mm') > -1
    },
    second () {
      return this.format.indexOf('ss') > -1
    }
  },
  created () {
    this._format(this.currentValue)
    this.$on('Va@timepickerIsMobile', (val) => { this.isMobile = val })

    /**
     * In case this component is instantiated after the LayoutManager
     * has initially broadcasted isMobile, let's request it.
     */
    this.dispatch('VaLayoutManager', 'Va@requestIsMobile', true)
  },
  mounted () {
    this._closeEvent = EventListener.listen(window, 'click', (e) => {
      if (!this.$el.contains(e.target)) this.close()
    })
  },
  beforeDestroy () {
    if (this._closeEvent) this._closeEvent.remove()
  }
}
</script>
