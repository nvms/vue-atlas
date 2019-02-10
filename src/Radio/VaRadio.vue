<template>
    <label :class="`${classPrefix}-radio-con`">
        <span :class="objClass">
          <span :class="`${classPrefix}-radio-inner`"
                :tabindex="disabled ? -1 : 0"
                @keypress.space.prevent="handleClick"
                @keyup.enter="handleClick"></span>
          <input :checked="currentChecked"
                 :class="`${classPrefix}-radio-input`"
                 :disabled="disabled"
                 :name="name"
                 @click.prevent="handleClick"
                 tabindex="-1"
                 type="radio">
        </span>
        <span :class="`${classPrefix}-label`" tabindex="-1">
            <slot/>
        </span>
        <validate :current="checked"
                  :custom-validate="customValidate"
                  :name="name"
                  :rules="rules">
        </validate>
    </label>
</template>

<script>
  import validationMixin from '../Mixin/validationMixin'
  import events from '../utils/events'
  import validate from '../validate'

  export default {
    name: 'VaRadio',
    mixins: [validationMixin, events],
    props: {
      name: {
        type: String
      },
      value: {
        type: String
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
    computed: {
      objClass() {
        let {classPrefix, currentChecked, disabled} = this
        let classes = {}

        classes[classPrefix + '-radio-span'] = true
        classes[classPrefix + '-radio-checked'] = currentChecked
        classes[classPrefix + '-radio-disabled'] = disabled

        return classes
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
    created() {
      this.$on('Va@radiogroupChange', (val) => {
        // this.currentChecked = val.indexOf(this.label) > -1
        this.currentChecked = val === this.label
      })
    },
    methods: {
      handleClick() {
        if (this.currentChecked) return
        this.currentChecked = true
        this.dispatch('VaRadioGroup', 'Va@radioChange', this.label)
        this.$emit('change', this.currentChecked)
      }
    }
  }
</script>
