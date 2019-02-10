<template>
    <label :class="classObj">
        <span>
          <span :class="`${classPrefix}-checkbox-inner`"
                :tabindex="disabled ? -1 : 0"
                @keypress.space.prevent="handleClick"
                @keyup.enter="enterPressed">
            <va-icon :class="`${classPrefix}-checkbox-inner-check`" type="check"></va-icon>
          </span>
          <input :checked="currentChecked"
                 :class="`${classPrefix}-checkbox-input`"
                 :disabled="disabled"
                 :name="name"
                 @click="handleClick"
                 tabindex="-1"
                 type="checkbox"/>
        </span>
        <span :class="`${classPrefix}-label`">
          <slot/>
        </span>
        <validate
                :current="currentChecked"
                :custom-validate="customValidate"
                :name="name"
                :rules="rules">
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
      classPrefix: {
        type: String,
        default: 'va'
      }
    },
    components: {
      validate
    },
    data() {
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
      value(val) {
        this.currentChecked = val
      },
      checked(val) {
        this.currentChecked = val
      },
      currentChecked(val) {
        this.$emit('input', val)
      }
    },
    computed: {
      classObj() {
        let {classPrefix, currentChecked, disabled} = this
        let classes = {}

        classes[classPrefix + '-checkbox-label'] = true
        classes[classPrefix + '-checkbox-checked'] = currentChecked
        classes[classPrefix + '-checkbox-disabled'] = disabled

        return classes
      }
    },
    created() {
      this.$on('Va@checkboxgroupChange', (val) => {
        this.currentChecked = val.indexOf(this.label) > -1
      })
    },
    methods: {
      handleClick() {
        this.currentChecked = !this.currentChecked
        this.dispatch('VaCheckboxGroup', 'Va@checkboxChange', this)
        this.$emit('change', this.currentChecked)
      },
      enterPressed() {
        this.handleClick()
      }
    }
  }
</script>
