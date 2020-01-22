<template>
  <va-button
    @click.prevent.native="handleClick"
    :class="classObj"
    :disabled="disabled"
    :type="currentChecked ? 'primary' : 'default'"
  >
    <slot/>
  </va-button>
</template>

<script>
import events from '../utils/events'
import validationMixin from '../Mixin/validationMixin'

export default {
  name: 'VaRadioBtn',
  mixins: [validationMixin, events],
  props: {
    value: {
      type: String
    },
    label: {
      type: [String, Number]
    },
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value (val) {
      this.currentChecked = val
    },
    checked (val) {
      this.currentChecked = val
    },
    currentChecked (val) {
      this.$emit('input', val)
    }
  },
  data () {
    let checked = this.checked
    if (checked !== undefined) {
      this.$emit('input', checked)
    } else {
      checked = !!this.value
    }

    return {
      currentChecked: checked
    }
  },
  computed: {
    classObj () {
      const classes = {}

      classes['va-radio-btn'] = true

      return classes
    }
  },
  created () {
    this.$on('Va@radiogroupChange', val => {
      this.currentChecked = val === this.label
    })
  },
  methods: {
    handleClick () {
      if (this.currentChecked) return
      this.currentChecked = true
      this.dispatch('VaRadioGroup', 'Va@radioChange', this.label)
      this.$emit('change', this.currentChecked)
    }
  }
}
</script>
