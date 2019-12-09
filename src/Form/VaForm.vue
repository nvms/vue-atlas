<template>
  <form
    :class="classObj"
    @submit.prevent="noop"
    :id="id"
    :name="name"
    v-bind="$attrs"
  >
    <slot/>
  </form>
</template>

<script>
import type from '../utils/type'
import events from '../utils/events'

export default {
  name: 'VaForm',
  mixins: [events],
  inheritAttrs: false,
  props: {
    id: {
      type: String
    },
    name: {
      type: String
    },
    type: {
      type: String,
      default: 'horizontal',
      required: false,
      validator (v) {
        return ['horizontal', 'inline', 'vertical'].includes(v)
      }
    }
  },
  methods: {
    noop () {},
    validateFields (cb) {
      this.validate = false
      this.$nextTick(() => {
        this.validate = true
        this.$nextTick(() => {
          if (type.isFunction(cb)) {
            cb(this.result)
          }
        })
      })
    },
    resetValidation (cb) {
      this.validate = false
      this.$nextTick(() => {
        this.result = { results: {}, isvalid: true }
        this.$emit('validateChange', this.result)
        if (type.isFunction(cb)) {
          cb(this.result)
        }
      })
    }
  },
  watch: {
    validate (val) {
      this.broadcast('VaValidate', 'Va@openValidate', val)
      if (val) {
        this.result = this._result
      } else {
        this.result = { results: {}, isvalid: true }
      }
    },
    result (val) {
      if (this.validate) {
        this.$emit('validateChange', val)
      }
    },
    type (val) {
      this.broadcast('VaFormItem', 'Va@formTypeChange', val)
    }
  },
  mounted () {
    if (!this.validate) {
      this.result = { results: {}, isvalid: true }
    }
    this.broadcast('VaValidate', 'Va@openValidate', this.validate)
    this.broadcast('VaFormItem', 'Va@formTypeChange', this.type)
  },
  computed: {
    classObj () {
      const { type } = this
      const classes = {}

      classes['va-form-horizontal'] = type === 'horizontal'
      classes['va-form-inline'] = type === 'inline'
      classes['clearfix'] = true

      return classes
    }
  },
  created () {
    this.$on('openValidate', () => {
      this.validate = true
    })

    this.$on('closeValidate', () => {
      this.validate = false
    })

    this.$on('Va@validateChange', val => {
      const name = val.name
      const validateResult = Object.assign({}, this._result)

      if (!validateResult.results) validateResult.results = {}
      validateResult.results[name] = val.result

      validateResult.isvalid = true

      for (const i in validateResult.results) {
        if (!validateResult.results[i]['isvalid']) {
          validateResult.isvalid = false
          break
        }
      }

      this._result = validateResult

      if (this.validate) {
        this.result = this._result
        this.$emit('validateChange', this.result)
      }
    })

    this.$on('Va@validateDestroy', val => {
      delete this.result.results[val.name]
      delete this._result.results[val.name]
    })

    this.$on('Va@requestFormType', () => {
      this.broadcast('VaFormItem', 'Va@formTypeChange', this.type)
    })
  },

  data () {
    return {
      // eslint-disable-next-line
      _result: { results: {}, isvalid: true },
      result: { results: {}, isvalid: true },
      validate: false
    }
  }
}
</script>
