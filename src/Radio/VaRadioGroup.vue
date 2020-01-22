<template>
  <div :class="classObj">
    <slot/>
    <validate
      :name="name"
      :rules="rules"
      :custom-validate="customValidate"
      :current="value"
    />
  </div>
</template>

<script>
import events from '../utils/events'
import type from '../utils/type'
import validate from '../validate'
import validationMixin from '../Mixin/validationMixin'

export default {
  name: 'VaRadioGroup',
  mixins: [validationMixin, events],
  props: {
    value: {
      type: [String, Array]
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentValue: ''
    }
  },
  methods: {
    init (val) {
      if (!type.isUndefined(val)) {
        this.currentValue = val
      } else {
        // first load
        const children = this.$children
        let ret

        children.forEach(item => {
          item.currentChecked ? (ret = item.label) : ''
        })
        this.currentValue = ret
      }
    }
  },
  watch: {
    value (val) {
      this.currentValue = val
    },
    currentValue (val) {
      this.broadcast('VaRadio', 'Va@radiogroupChange', val)
      this.broadcast('VaRadioBtn', 'Va@radiogroupChange', val)
      this.$emit('input', val)
      this.$emit('change', val)
    }
  },
  created () {
    this.$on('Va@radioChange', val => {
      this.init(val)
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

      // The -btn-group class is only necessary to give the proper border radius to buttons
      // in a radio group if radio buttons are used instead of regular radio elements.
      classes['va-btn-group'] = !vertical
      classes['va-btn-group-vertical'] = vertical
      classes['va-radio-group'] = true
      classes['va-radio-group-vertical'] = vertical

      return classes
    }
  }
}
</script>
