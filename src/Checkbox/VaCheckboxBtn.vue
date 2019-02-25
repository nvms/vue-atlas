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

export default {
  name: 'VaCheckboxBtn',
  mixins: [events],
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
    },
    classPrefix: {
      type: String,
      default: 'va'
    }
  },
  computed: {
    classObj () {
      let { classPrefix } = this
      let classes = {}

      classes[classPrefix + '-checked-btn'] = true

      return classes
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
  methods: {
    handleClick () {
      this.currentChecked = !this.currentChecked
      this.dispatch('VaCheckboxGroup', 'Va@checkboxChange', this)
      this.$emit('change', this.currentChecked)
    }
  },
  created () {
    this.$on('Va@checkboxgroupChange', val => {
      this.currentChecked = val.indexOf(this.label) > -1
    })
  }
}
</script>
