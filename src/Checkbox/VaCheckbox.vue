<template>
  <label :class="classObj">
    <span>
      <span :class="`${prefixCls}-checkbox-inner`" tabindex="0" v-on:keyup.enter="enterPressed">
        <va-icon type="check" :class="`${prefixCls}-checkbox-inner-check`"></va-icon>
      </span>
      <input
        tabindex="-1"
        type="checkbox"
        :name="name"
        :class="`${prefixCls}-checkbox-input`"
        :disabled="disabled"
        :checked="currentChecked"
        @click="handleClick" />
    </span>
    <span :class="`${prefixCls}-label`">
      <slot />
    </span>
    <validate
      :name="name"
      :rules="rules"
      :custom-validate="customValidate"
      :current="currentChecked">
    </validate>
  </label>
</template>

<script>
import events from '../utils/events'
import validationMixin from '../Mixin/validationMixin'
import validate from '../validate'

export default {
  name: 'VaCheckbox',
  mixins: [validationMixin, events],
  props: {
    name: {
      type: String
    },
    value: {
      type: [String, Boolean]
    },
    checked: {
      type: Boolean,
      default: false
    },
    label: {
      type: [String, Number]
    },
    disabled: {
      type: Boolean,
      default: false
    },
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  components: {
    validate
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
  computed: {
    classObj () {
      let {prefixCls, currentChecked, disabled} = this
      let klass = {}

      klass[prefixCls + '-checkbox-label'] = true
      klass[prefixCls + '-checkbox-checked'] = currentChecked
      klass[prefixCls + '-checkbox-disabled'] = disabled

      return klass
    }
  },
  created () {
    this.$on('Va@checkboxgroupChange', (val) => {
      this.currentChecked = val.indexOf(this.label) > -1
    })
  },
  methods: {
    handleClick () {
      this.currentChecked = !this.currentChecked
      this.dispatch('VaCheckboxGroup', 'Va@checkboxChange', this)
      this.$emit('change', this.currentChecked)
    },
    enterPressed () {
      this.handleClick()
    }
  }
}
</script>
