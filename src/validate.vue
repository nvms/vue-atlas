<template>
  <div class="va-err-tip" v-if="validate && tips">{{tips}}</div>
</template>

<script>
import type from './utils/type'
import events from './utils/events'
import localeMixin from './Mixin/localeMixin'

export default {
  name: 'VaValidate',
  mixins: [events, localeMixin('VaValidate')],
  props: {
    value: {
      type: String
    },
    customValidate: {
      type: Function
    },
    rules: {
      type: Array
    },
    name: {
      type: String
    },
    current: {}
  },
  data () {
    return {
      tips: '',
      validate: false,
      status: '',
      vStatus: this.value,
      results: {}
    }
  },
  created () {
    this.$on('Va@openValidate', val => {
      this.validate = val
      val ? (this.vStatus = this.status) : (this.vStatus = '')
    })
  },
  beforeDestroy () {
    this.dispatch('VaForm', 'Va@validateChange', {
      name: this.name,
      result: { results: {}, isvalid: true }
    })
    this.dispatch('VaForm', 'Va@validateDestroy', {
      name: this.name,
      result: this.results
    })
  },
  computed: {
    _results: {
      get () {
        return this.results
      },
      set (val) {
        const self = this
        let tips = ''
        let status = ''

        for (const key in val) {
          const obj = val[key]
          if (type.isObject(obj)) {
            obj.tips ? (tips += obj.tips + '  ') : ''
            if (obj.validStatus !== 'success') {
              status = 'error'
            }
          }
        }

        status !== 'error' ? (status = 'success') : 0

        self.status = status

        if (self.validate) {
          self.vStatus = self.status
        }

        let isvalid = true
        self.tips = tips

        for (const i in val) {
          const validStatus = val[i].validStatus
          if (validStatus === 'error') {
            isvalid = false
            break
          }
        }

        const newVal = Object.assign({}, val)
        newVal.isvalid = isvalid

        if (this.isEqual(newVal, this.results)) {
          return
        }

        this.results = newVal

        self.dispatch('VaForm', 'Va@validateChange', {
          name: self.name,
          result: self.results
        })
      }
    }
  },
  watch: {
    current: {
      handler (newVal) {
        this.valid(newVal)
      },
      immediate: true
    },
    vStatus (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    isEqual (a, b) {
      let e = true
      const propsA = Object.keys(a)
      const propsB = Object.keys(b)

      if (propsA.length !== propsB.length) {
        return false
      }

      propsA.forEach(i => {
        if (a[i].validStatus !== b[i].validStatus) {
          e = false
          return false
        }
      })

      return e
    },
    setResult (key, value) {
      const o = Object.assign({}, this.results)
      o[key] = value
      this._results = o
    },
    valid (val) {
      if (this.rules || type.isFunction(this.customValidate)) {
        this.rulesValid(val)
      }
    },
    rulesItemValid (rule, value) {
      const self = this
      const tip = rule.tip
      const type = rule.type

      switch (type) {
        case 'required':
          self.requiredValid(value, tip)
          break
        case 'phone':
          self.phoneValid(value, tip)
          break
        case 'number':
          self.numberValid(value, tip)
          break
        case 'telephone':
          self.telValid(value, tip)
          break
        case 'email':
          self.emailValid(value, tip)
          break
      }

      if (type.indexOf('maxlength') > -1) {
        self.maxlengthValid(type, value, tip)
        // eslint-disable-next-line
        return
      }

      if (type.indexOf('minlength') > -1) {
        self.minlengthValid(type, value, tip)
        // eslint-disable-next-line
        return
      }
    },
    customValid (val) {
      this.setResult('customValidate', this.customValidate(val))
    },
    requiredValid (val, tip) {
      const self = this

      self._results = self._results || {}

      if (type.isNullOrUndefined(val) || val.length === 0) {
        self.setResult('requiredValid', {
          validStatus: 'error',
          tips: tip || self.getL('required')
        })
      } else {
        self.setResult('requiredValid', {
          validStatus: 'success',
          tips: ''
        })
      }
    },
    maxlengthValid (type, val, tip) {
      const self = this
      const maxlength = type.split('=')[1] - 0

      self._results = self._results || {}

      if (val) {
        if (val.length > maxlength) {
          self.setResult('maxlengthValid', {
            validStatus: 'error',
            tips: tip || self.getL('maxLength') + maxlength
          })
        } else {
          self.setResult('maxlengthValid', {
            validStatus: 'success',
            tips: ''
          })
        }
      }
    },
    minlengthValid (type, val, tip) {
      const self = this
      const minlength = type.split('=')[1] - 0

      self._results = self._results || {}

      if (val) {
        if (val.length < minlength) {
          self.setResult('minlengthValid', {
            validStatus: 'error',
            tips: tip || self.getL('minLength') + minlength
          })
        } else {
          self.setResult('minlengthValid', {
            validStatus: 'success',
            tips: ''
          })
        }
      }
    },
    rulesValid (value) {
      const self = this

      self.rules.forEach(val => {
        self.rulesItemValid(val, value)
      })

      if (type.isFunction(self.customValidate)) {
        self.customValid(value)
      }
    },
    phoneValid (value, tip) {
      const rule = /^1\d{10}$/

      if (rule.test(value) || value === '') {
        this.setResult('isPhoneValid', {
          validStatus: 'success',
          tips: ''
        })
      } else {
        this.setResult('isPhoneValid', {
          validStatus: 'error',
          tips: tip || this.getL('phone')
        })
      }
    },
    numberValid (value, tip) {
      const rule = /^\d*$/

      if (rule.test(value) || value === '') {
        this.setResult('isNumberValid', {
          validStatus: 'success',
          tips: ''
        })
      } else {
        this.setResult('isNumberValid', {
          validStatus: 'error',
          tips: tip || this.getL('number')
        })
      }
    },
    telValid (value, tip) {
      // eslint-disable-next-line
      let rule = /^[2-9]\d{2}-\d{3}-\d{4}$/

      if (rule.test(value) || value === '') {
        this.setResult('isTelValid', {
          validStatus: 'success',
          tips: ''
        })
      } else {
        this.setResult('isTelValid', {
          validStatus: 'error',
          tips: tip || this.getL('telephone')
        })
      }
    },
    emailValid (value, tip) {
      const rule = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

      if (rule.test(value) || value === '') {
        this.setResult('isEmailValid', {
          validStatus: 'success',
          tips: ''
        })
      } else {
        this.setResult('isEmailValid', {
          validStatus: 'error',
          tips: tip || this.getL('email')
        })
      }
    }
  }
}
</script>
