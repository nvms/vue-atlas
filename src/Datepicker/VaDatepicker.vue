<template>
  <div :class="`${prefixCls}-datepicker`">

    <va-input
      v-if="!isMobile || !isDateSupported"
      :width="width"
      :name="name"
      :rules="rules"
      :placeholder="placeholder"
      :custom-validate="customValidate"
      :disabled="disabled"
      :readonly="readonly"
      :show-clean="true"
      :size="size !== 'md' ? size : null"
      icon="calendar-alt"
      @clean="clean"
      @click.native="inputClick"
      :no-v-model="true"
      v-model="currentValue">
    </va-input>

    <va-input
      v-if="isMobile && isDateSupported"
      :width="width"
      :name="name"
      :rules="rules"
      :placeholder="placeholder"
      :disabled="disabled"
      :custom-validate="customValidate"
      :readonly="false"
      :show-clean="false"
      :size="size !== 'md' ? size : null"
      type="date"
      :no-v-model="true"
      v-model="currentValue">
    </va-input>

    <transition name="fadeDown">
      <div :class="`${prefixCls}-datepicker-popup`" v-show="displayDayView" v-va-position="displayDayView">
        <div :class="`${prefixCls}-datepicker-inner`">
          <div :class="`${prefixCls}-datepicker-body`">
            <div :class="`${prefixCls}-datepicker-ctrl`">
              <va-button
                tabindex="0"
                :class="`${prefixCls}-month-btn ${prefixCls}-datepicker-preBtn`"
                @click.native="preNextMonthClick(0)"
                type="subtle"
                v-on:keyup.enter="preNextMonthClick(0)">
                <va-icon type="arrow-left" size="10px"></va-icon>
              </va-button>
              <va-button
                @click.native="switchMonthView"
                type="subtle"
                tabindex="0"
                v-on:keyup.enter="switchMonthView">{{stringifyDayHeader(currDate)}}</va-button>
              <va-button
                tabindex="0"
                :class="`${prefixCls}-month-btn ${prefixCls}-datepicker-nextBtn`"
                @click.native="preNextMonthClick(1)"
                type="subtle"
                v-on:keyup.enter="preNextMonthClick(1)">
                <va-icon type="arrow-right" size="10px"></va-icon>
              </va-button>
            </div>
            <div :class="`${prefixCls}-datepicker-weekRange`">
              <span v-for="(w, index) in weekRange" :key="index">{{w}}</span>
            </div>
            <div :class="`${prefixCls}-datepicker-dateRange`">
              <span
                v-for="(d, index) in dateRange" :class="d.sclass"
                @click="daySelect(d.date, d.text, d.sclass)"
                :key="index"
                tabindex="0"
                v-on:keyup.enter="daySelect(d.date, d.text, d.sclass)">{{d.text}}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fadeDown">
      <div :class="`${prefixCls}-datepicker-popup`" v-show ="displayMonthView" v-va-position="displayMonthView">
        <div :class="`${prefixCls}-datepicker-inner`">
          <div :class="`${prefixCls}-datepicker-body`">
            <div :class="`${prefixCls}-datepicker-ctrl`">
            <va-button
              :class="`${prefixCls}-month-btn ${prefixCls}-datepicker-preBtn`"
              @click.native="preNextYearClick(0)"
              type="subtle"
              tabindex="0"
              v-on:keyup.enter="preNextYearClick(0)">
              <va-icon type="arrow-left" size="10px"></va-icon>
            </va-button>
            <va-button
              @click.native="switchDecadeView"
              type="subtle"
              tabindex="0"
              v-on:keyup.enter="switchDecadeView">{{stringifyYearHeader(currDate)}}</va-button>
            <va-button
              :class="`${prefixCls}-month-btn ${prefixCls}-datepicker-nextBtn`"
              @click.native="preNextYearClick(1)"
              type="subtle"
              tabindex="0"
              v-on:keyup.enter="preNextYearClick(1)">
              <va-icon type="arrow-right" size="10px"></va-icon>
            </va-button>
            </div>
            <div :class="`${prefixCls}-datepicker-monthRange`">
              <template v-for="(m, index) in monthNames">
                <span
                  :class="monthClassObj(m)"
                  :key="index"
                  tabindex="0"
                  v-on:keyup.enter="monthSelect(index)"
                  @click="monthSelect(index)">{{m}}</span>
              </template>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fadeDown">
      <div :class="`${prefixCls}-datepicker-popup`" v-show ="displayYearView" v-va-position="displayYearView">
        <div :class="`${prefixCls}-datepicker-inner`">
          <div :class="`${prefixCls}-datepicker-body`">
            <div :class="`${prefixCls}-datepicker-ctrl`">
              <va-button
                :class="`${prefixCls}-month-btn ${prefixCls}-datepicker-preBtn`"
                @click.native="preNextDecadeClick(0)"
                type="subtle"
                tabindex="0"
                v-on:keyup.enter="preNextDecadeClick(0)">
                <va-icon type="arrow-left" size="10px"></va-icon>
              </va-button>
              <va-button
                :class="`${prefixCls}-month-btn ${prefixCls}-datepicker-nextBtn`"
                @click.native="preNextDecadeClick(1)"
                type="subtle"
                tabindex="0"
                v-on:keyup.enter="preNextDecadeClick(1)">
                <va-icon type="arrow-right" size="10px"></va-icon>
              </va-button>
              <p>
              {{stringifyDecadeHeader(currDate)}}
              </p>
            </div>
            <div :class="`${prefixCls}-datepicker-monthRange ${prefixCls}-datepicker-decadeRange`">
              <template v-for="(decade, index) in decadeRange">
                <span
                  :class="yearClassObj(decade)"
                  :key="index"
                  tabindex="0"
                  v-on:keyup.enter="yearSelect(decade.text)"
                  @click.stop="yearSelect(decade.text)">
                  {{decade.text}}
                </span>
              </template>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import EventListener from '../utils/EventListener'
import inputMixin from '../Mixin/inputMixin'
import localeMixin from '../Mixin/localeMixin'
import format from '../utils/format'
import events from '../utils/events'

export default {
  name: 'VaDatepicker',
  mixins: [inputMixin, localeMixin('VaDatepicker'), events],
  props: {
    value: {
      type: String
    },
    size: {
      type: String,
      default: "md"
    },
    format: {
      type: String,
      default: 'MM-dd-yyyy',
      required: false,
      note: 'The RFC2822/ISO date format in which to display the date in the input field. Ex: \'MM/dd/yyyy\''
    },
    readonly: {
      type: Boolean,
      default: false,
      required: false,
      note: 'When true, the input cannot be changed with keyboard input'
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false,
      note: 'When true, input is disabled'
    },
    autoclose: {
      type: Boolean,
      default: true,
      note: 'When true, dropdown closes on date selection'
    },
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  data () {
    let currentValue = this.value
    if (typeof currentValue === 'undefined') {
      this.$emit('input', null)
      currentValue = null
    }
    return {
      isMobile: false,
      currentValue,
      currMonth: 0,
      currYear: 0,
      today: '',
      weekRange: [
        this.getL('sunday'),
        this.getL('monday'),
        this.getL('tuesday'),
        this.getL('wednesday'),
        this.getL('thursday'),
        this.getL('friday'),
        this.getL('saturday')
      ],
      dateRange: [],
      decadeRange: [],
      currDate: new Date(),
      displayDayView: false,
      displayMonthView: false,
      displayYearView: false,
      monthNames: [
        this.getL('january'),
        this.getL('february'),
        this.getL('march'),
        this.getL('april'),
        this.getL('may'),
        this.getL('june'),
        this.getL('july'),
        this.getL('august'),
        this.getL('september'),
        this.getL('october'),
        this.getL('november'),
        this.getL('december')
      ]
    }
  },
  watch: {
    currDate () {
      this.getDateRange()
    },
    value (val) {
      if (this.inner) {
        this.inner = false
        return
      }
      this.inner = true
      this.currentValue = val || null
    },
    currentValue (val) {
      if (this.inner) {
        this.inner = false
        return
      }
      this.inner = true
      this.$emit('input', val)
      this.$emit('change', this.currentValue)
    }
  },
  methods: {
    keyup (e) {
      if (e.keyCode === 27) {
        this.close()
      }
    },
    clean () {
      this.currDate = new Date()
      this.currYear = this.currDate.getFullYear()
      this.currMonth = this.currDate.getMonth()
      // this.currentValue = this.stringify(new Date())
    },
    monthClassObj (m) {
      let {prefixCls, currentValue, monthNames, parse, currDate} = this
      let klass = {}

      klass[prefixCls + '-datepicker-dateRange-item-active'] =
        currentValue && parse(currentValue) && monthNames[parse(currentValue).getMonth()] === m && currDate.getFullYear() === parse(currentValue).getFullYear()

      return klass
    },
    yearClassObj (decade) {
      let {prefixCls, currentValue, parse} = this
      let klass = {}

      klass[prefixCls + '-datepicker-dateRange-item-active'] =
        currentValue && parse(currentValue) && parse(currentValue).getFullYear() === decade.text

      return klass
    },
    close () {
      this.displayDayView = this.displayMonthView = this.displayYearView = false
    },
    inputClick () {
      if (this.disabled) return
      if (this.displayMonthView || this.displayYearView) {
        this.displayDayView = false
      } else {
        this.displayDayView = !this.displayDayView
      }
    },
    preNextDecadeClick (flag) {
      const year = this.currDate.getFullYear()
      const months = this.currDate.getMonth()
      const date = this.currDate.getDate()

      if (flag === 0) {
        this.currDate = new Date(year - 10, months, date)
      } else {
        this.currDate = new Date(year + 10, months, date)
      }
    },
    preNextMonthClick (flag) {
      const year = this.currDate.getFullYear()
      const month = this.currDate.getMonth()
      const date = this.currDate.getDate()

      if (flag === 0) {
        const preMonth = this.getYearMonth(year, month - 1)
        this.currDate = new Date(preMonth.year, preMonth.month, date)
        this.currMonth = preMonth.month
        this.currYear = preMonth.year
      } else {
        const nextMonth = this.getYearMonth(year, month + 1)
        this.currDate = new Date(nextMonth.year, nextMonth.month, date)
        this.currMonth = nextMonth.month
        this.currYear = nextMonth.year
      }
    },
    preNextYearClick (flag) {
      const year = this.currDate.getFullYear()
      const months = this.currDate.getMonth()
      const date = this.currDate.getDate()

      if (flag === 0) {
        this.currDate = new Date(year - 1, months, date)
        this.currYear = year - 1
      } else {
        this.currDate = new Date(year + 1, months, date)
        this.currYear = year + 1
      }
    },
    yearSelect (year) {
      this.currYear = year
      this.displayYearView = false
      this.displayMonthView = true
      this.currDate = new Date(year, this.currDate.getMonth(), this.currDate.getDate())
    },
    daySelect (date, dayNumber, klass) {
      if (klass.indexOf(this.prefixCls + '-datepicker-item-disabled') > -1) {
        return false
      } else {
        this.currYear = date.getFullYear()
        this.currMonth = date.getMonth()

        this.currDate = new Date(this.currYear, this.currMonth, dayNumber)
        this.currentValue = this.stringify(this.currDate)
        if (this.autoclose) {
          this.close()
        }
      }
    },
    switchMonthView () {
      this.displayDayView = false
      this.displayMonthView = true
    },
    switchDecadeView () {
      this.displayMonthView = false
      this.displayYearView = true
    },
    monthSelect (index) {
      this.currMonth = index
      this.displayMonthView = false
      this.displayDayView = true
      this.currDate = new Date(this.currDate.getFullYear(), index, this.currDate.getDate())
    },
    getYearMonth (year, month) {
      if (month > 11) {
        year++
        month = 0
      } else if (month < 0) {
        year--
        month = 11
      }

      return {year: year, month: month}
    },
    stringifyDecadeHeader (date) {
      const yearStr = date.getFullYear().toString()
      const firstYearOfDecade = yearStr.substring(0, yearStr.length - 1) + 0
      const lastYearOfDecade = parseInt(firstYearOfDecade, 10) + 10

      return firstYearOfDecade + '-' + lastYearOfDecade
    },
    stringifyDayHeader (date) {
      return this.monthNames[date.getMonth()] + ' ' + date.getFullYear()
    },
    stringifyYearHeader (date) {
      return date.getFullYear()
    },
    parseMonth (date) {
      return this.monthNames[date.getMonth()]
    },
    stringify (date, format = this.format) {
      if (isNaN(date.getFullYear())) return ''

      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()

      return format
        .replace(/yyyy/g, year)
        .replace(/MMMM/g, month)
        .replace(/MMM/g, month)
        .replace(/MM/g, ('0' + month).slice(-2))
        .replace(/dd/g, ('0' + day).slice(-2))
        // .replace(/yy/g, year)
        .replace(/M(?!a)/g, month)
        .replace(/d/g, day)
    },
    parse (str) {
      const date = new Date(format.dateParse(str, 'MM-DD-YYYY'))
      // const date = new Date(format.dateParse(str, this.format))
      return isNaN(date.getFullYear()) ? null : date
    },
    getDayCount (year, month) {
      const dict = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

      if (month === 1) {
        if ((year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0)) {
          return 29
        }
        return 28
      }

      return dict[month]
    },
    getDateRange () {
      this.dateRange = []
      this.decadeRange = []
      const time = {
        year: this.currDate.getFullYear(),
        month: this.currDate.getMonth(),
        day: this.currDate.getDate()
      }
      const todayDate = new Date()
      const today = {
        year: todayDate.getFullYear(),
        month: todayDate.getMonth(),
        day: todayDate.getDate()
      }
      const yearStr = time.year.toString()
      const firstYearOfDecade = (yearStr.substring(0, yearStr.length - 1) + 0) - 1
      for (let i = 0; i < 12; i++) {
        this.decadeRange.push({
          text: firstYearOfDecade + i
        })
      }

      const currMonthFirstDay = new Date(time.year, time.month, 1)
      let firstDayWeek = currMonthFirstDay.getDay() + 1
      if (firstDayWeek === 0) {
        firstDayWeek = 7
      }
      const dayCount = this.getDayCount(time.year, time.month)
      if (firstDayWeek > 1) {
        const preMonth = this.getYearMonth(time.year, time.month - 1)
        const prevMonthDayCount = this.getDayCount(preMonth.year, preMonth.month)
        for (let i = 1; i < firstDayWeek; i++) {
          const dayText = prevMonthDayCount - firstDayWeek + i + 1
          this.dateRange.push({
            text: dayText,
            date: new Date(preMonth.year, preMonth.month, dayText),
            sclass: this.prefixCls + '-datepicker-item-gray'
          })
        }
      }


      for (let i = 1; i <= dayCount; i++) {
        const date = new Date(time.year, time.month, i)
        let sclass = ''

        if (i === today.day && time.month == today.month) {
          sclass = this.prefixCls + '-datepicker-dateRange-item-today'
        }

        if (i === time.day) {
          if (this.currentValue) {
            const valueDate = this.parse(this.currentValue)
            if (valueDate) {
              if (valueDate.getFullYear() === time.year && valueDate.getMonth() === time.month) {
                sclass = this.prefixCls + '-datepicker-dateRange-item-active'
              }
            }
          }
        }
        this.dateRange.push({
          text: i,
          date: date,
          sclass: sclass
        })
      }

      if (this.dateRange.length < 42) {
        const nextMonthNeed = 42 - this.dateRange.length
        const nextMonth = this.getYearMonth(time.year, time.month + 1)

        for (let i = 1; i <= nextMonthNeed; i++) {
          this.dateRange.push({
            text: i,
            date: new Date(nextMonth.year, nextMonth.month, i),
            sclass: this.prefixCls + '-datepicker-item-gray'
          })
        }
      }
    }
  },
  created () {
    this.today = this.stringify(new Date())
    this.$on('Va@datepickerIsMobile', (val) => { this.isMobile = val })

    /**
     * In case this component is instantiated after the App
     * has initially broadcasted isMobile, let's request it.
     */
    this.dispatch('VaApp', 'Va@requestIsMobile', true)

    document.addEventListener('keyup', this.keyup)
  },
  computed: {
    isDateSupported () {
      let input = document.createElement('input')
      let value = 'a'
      input.setAttribute('type', 'date')
      input.setAttribute('value', value)
      return (input.value !== value)
    }
  },
  mounted () {
    this.currDate = this.parse(this.currentValue) || this.parse(new Date())
    this._closeEvent = EventListener.listen(window, 'click', (e) => {
      if (!this.$el.contains(e.target)) this.close()
    })
  },
  beforeDestroy () {
    if (this._closeEvent) this._closeEvent.remove()
    document.removeEventListener('keyup', this.keyup)
  }
}
</script>
