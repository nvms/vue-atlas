<template>
  <div class="va-timepicker">
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
      @mousedown.native="inputClick"
      :clearable="true"
      icon="clock"
      icon-style="regular"
      v-model="currentValue"
    />
    <va-input
      v-if="isMobile"
      :width="width"
      :name="name"
      :rules="rules"
      :placeholder="placeholder"
      :custom-validate="customValidate"
      :disabled="disabled"
      :readonly="readonly"
      :clearable="true"
      type="time"
      v-model="currentValue"
    />
    <transition name="fadeDown">
      <div
        v-show="show"
        v-va-position="show"
        class="va-timepicker-popup"
      >
        <div
          v-if="hour"
          data-role="hour"
          class="va-timepicker-range-wrap"
        >
          <div class="va-timepicker-preview">
              <div>
                {{fix(time.hour, 2)}}:{{fix(time.minute, 2)}}.{{fix(time.second, 2)}}
              </div>
              <div class="va-timepicker-preview-twelvehour">
                {{fix(twelvehour, 2)}}:{{fix(time.minute, 2)}}.{{fix(time.second, 2)}} {{ampm}}
              </div>
          </div>
          <span>{{getL('hour')}}</span>
          <va-range
            width="190"
            v-model="time.hour"
            :min="hourRange[0]"
            :max="hourRange[1]"
            class="va-timepicker-range"
          />
        </div>
        <div
          v-if="minute"
          data-role="minute"
          class="va-timepicker-range-wrap"
        >
          <span>{{getL('minute')}}</span>
          <va-range
            width="190"
            v-model="time.minute"
            :min="minuteRange[0]"
            :max="minuteRange[1]"
            class="va-timepicker-range"
          />
        </div>
        <div
          v-if="second"
          data-role="second"
          class="va-timepicker-range-wrap"
        >
          <span>{{getL('second')}}</span>
          <va-range
            width="190"
            v-model="time.second"
            :min="secondRange[0]"
            :max="secondRange[1]"
            class="va-timepicker-range"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import EventListener from '../utils/EventListener'
import inputMixin from '../Mixin/inputMixin'
import localeMixin from '../Mixin/localeMixin'
import events from '../utils/events'

export default {
  name: 'VaTimepicker',
  mixins: [inputMixin, localeMixin('VaTimepicker'), events],
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
      handler () {
        var ret = ''
        this.time.hour > this.hourRange[1]
          ? (this.time.hour = this.hourRange[1])
          : 0
        this.time.minute > this.minuteRange[1]
          ? (this.time.minute = this.minuteRange[1])
          : 0
        this.time.second > this.secondRange[1]
          ? (this.time.second = this.secondRange[1])
          : 0
        this.time.hour < this.hourRange[0]
          ? (this.time.hour = this.hourRange[0])
          : 0
        this.time.minute < this.minuteRange[0]
          ? (this.time.minute = this.minuteRange[0])
          : 0
        this.time.second < this.secondRange[0]
          ? (this.time.second = this.secondRange[0])
          : 0
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
      return ('' + num).length < length
        ? (new Array(length + 1).join('0') + num).slice(-length)
        : '' + num
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
    },
    twelvehour () {
      return this.time.hour > 12 ? this.time.hour - 12 : this.time.hour === 0 ? 12 : this.time.hour
    },
    ampm () {
      return this.time.hour >= 12 ? 'PM' : 'AM'
    }
  },
  created () {
    this._format(this.currentValue)
    this.$on('Va@timepickerIsMobile', val => {
      this.isMobile = val
    })

    /**
     * In case this component is instantiated after the App
     * has initially broadcasted isMobile, let's request it.
     */
    this.dispatch('VaApp', 'Va@requestIsMobile', true)
  },
  mounted () {
    this._closeEvent = EventListener.listen(window, 'click', e => {
      if (!this.$el.contains(e.target)) this.close()
    })
  },
  beforeDestroy () {
    if (this._closeEvent) this._closeEvent.remove()
  }
}
</script>

<style lang="scss" src="../style/_reset.scss" scoped></style>
<style lang="scss">
@import "../variables";

.va-timepicker {
  position: relative;
  display: inline-block;
  &-popup {
    position: absolute;
    background: $N0;
    margin-top: 6px;
    margin-bottom: 6px;
    width: 400px;
    float: left;
    z-index: 1000;
    padding: 15px;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
      rgba(9, 30, 66, 0.31) 0px 0px 1px;
    border-radius: 3px;
  }
  &-preview {
    display: flex;
    justify-content: space-between;
    font-size: 22px;
    color: $N100;
    background: $N10;
    margin-left: -15px;
    margin-top: -15px;
    margin-right: -15px;
    margin-bottom: 10px;
    padding: 15px;
    border-bottom: 1px solid $N30;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;

    &-twelvehour {
      display: inline-flex;
      color: $N50;
    }
  }
  &-range-wrap {
    position: relative;
    margin: 0 0 5px 0;
    span {
      color: $N100;
      font-size: 12px;
      font-weight: 600;
    }
  }
}
</style>
