<template>
  <form :class="classObj" @submit.prevent="noop">
    <slot />
  </form>
</template>

<script>
import type from '../utils/type'
import events from '../utils/events'

export default {
  name: 'VaForm',
  mixins: [events],
  props: {
    type: {
      type: String,
      default: 'horizontal',
      required: false,
      validator (v) {
        return [
          'horizontal',
          'inline',
          'vertical'
        ].includes(v)
      },
      note: 'The type of form to render. See documentation example.'
    },
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  methods: {
    noop () {
    },
    validateFields (cb) {
      this.validate = true
      this.$nextTick(() => {
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
        this.result = {results: {}, isvalid: true}
      }
    },
    result (val) {
      if (this.validate) {
        this.$emit('change', val)
      }
    }
  },
  mounted () {
    if (!this.validate) {
      this.result = {results: {}, isvalid: true}
    }
    this.broadcast('VaValidate', 'Va@openValidate', this.validate)
  },
  computed: {
    classObj () {
      let {prefixCls, type} = this
      let klass = {}

      klass[prefixCls + '-form-horizontal'] = type === 'horizontal'
      klass[prefixCls + '-form-inline'] = type === 'inline'
      klass['clearfix'] = true

      return klass
    }
  },
  created () {
    this.$on('openValidate', () => {
      this.validate = true
    })

    this.$on('closeValidate', () => {
      this.validate = false
    })

    this.$on('Va@validateChange', (val) => {
      let name = val.name
      let validateResult = Object.assign({}, this._result)

      if (!validateResult.results) validateResult.results = {}
      validateResult.results[name] = val.result

      validateResult.isvalid = true

      for (let i in validateResult.results) {
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
  },

  data () {
    return {
      // eslint-disable-next-line
      _result: {results: {}, isvalid: true},
      result: {results: {}, isvalid: true},
      validate: false
    }
  }
}
</script>
