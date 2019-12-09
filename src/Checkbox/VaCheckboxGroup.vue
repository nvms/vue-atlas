<template>
  <div :class="classObj">
    <slot/>
    <validate
      :name="name"
      :rules="rules"
      :custom-validate="customValidate"
      :current="currentValue"
    />
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
    }
  },
  data () {
    return {
      currentValue: []
    }
  },
  methods: {
    init () {
      const children = this.$children
      const ret = []
      children.forEach(item => {
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
      const value = val || this.value
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
      const { vertical } = this
      const classes = {}

      classes['va-btn-group'] = !vertical
      classes['va-btn-group-vertical'] = vertical
      classes['va-checkbox-group'] = true
      classes['va-checkbox-group-vertical'] = vertical

      return classes
    }
  }
}
</script>
