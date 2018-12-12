<template>
  <div :class="classObj">
    <slot />
    <validate
      :name="name"
      :rules="rules"
      :custom-validate="customValidate"
      :current="currentValue">
    </validate>
  </div>
</template>

<script>
import validationMixin from '../Mixin/validationMixin'
import validate from '../validate'
import events from '../utils/events'

export default {
  name: 'VaCheckboxGroup',
  mixins: [validationMixin, events],
  props: {
    value: {
      type: [Array, String],
      default () {
        return []
      }
    },
    vertical: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'checkbox'
    },
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  data () {
    return {
      currentValue: []
    }
  },
  methods: {
    init () {
      let children = this.$children
      let ret = []
      children.forEach((item) => {
        item.currentChecked ? ret.push(item.label) : ''
      })
      this.currentValue = ret
    }
  },
  watch: {
    value (val) {
      this.currentValue = val
    },
    currentValue (val) {
      let value = val || this.value
      this.broadcast('VaCheckbox', 'Va@checkboxgroupChange', value)
      this.broadcast('VaCheckboxBtn', 'Va@checkboxgroupChange', value)
      this.$emit('input', value)
      this.$emit('change', value)
    }
  },
  created () {
    this.$on('Va@checkboxChange', () => {
      this.init()
    })
  },
  mounted () {
    this.currentValue = this.value
    this.$nextTick(() => {
      this.init()
    })
  },
  components: {
    validate
  },
  computed: {
    classObj () {
      let {prefixCls, vertical} = this
      let klass = {}

      klass[prefixCls + '-btn-group'] = !vertical
      klass[prefixCls + '-btn-group-vertical'] = vertical
      klass[prefixCls + '-checkbox-group'] = true
      klass[prefixCls + '-checkbox-group-vertical'] = vertical

      return klass
    }

  }
}
</script>
