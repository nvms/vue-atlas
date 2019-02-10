<template>
    <label :class="classObj" @click.prevent>
        <input :checked="value"
               :class="`${classPrefix}-toggle__input`"
               :name="name"
               @keypress.space.prevent="toggle"
               tabindex="-1"
               type="checkbox">
        <div :aria-label="label"
             :class="`${classPrefix}-toggle__slide`"
             :tabindex="disabled ? -1 : 0"
             @click="toggle"
             @keypress.space.prevent="toggle">
            <div :class="`${classPrefix}-toggle__inner`">
                <span :class="`${classPrefix}-toggle__handle`"></span>
                <span :class="`${classPrefix}-toggle__icon`">
                    <va-icon :type="icon"></va-icon>
                </span>
            </div>
        </div>
    </label>
</template>

<script>
  export default {
    name: 'VaToggle',
    props: {
      name: {
        type: String
      },
      label: {
        type: String
      },
      value: {
        type: Boolean,
        required: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      size: {
        type: String,
        default: 'md',
        required: false,
        validator(v) {
          return [
            'md',
            'lg'
          ].includes(v)
        }
      },
      classPrefix: {
        type: String,
        default: 'va'
      }
    },
    computed: {
      classObj() {
        let classes = {}
        classes[this.classPrefix + '-toggle'] = true
        classes[this.classPrefix + '-toggle--checked'] = this.value
        classes[this.classPrefix + '-toggle--disabled'] = this.disabled
        classes[this.classPrefix + '-toggle--lg'] = this.size === 'lg'
        return classes
      },
      icon() {
        return this.value ? 'check' : 'times'
      }
    },
    methods: {
      toggle() {
        if (this.disabled) {
          return
        }
        let newState = !this.value
        this.$emit('input', newState)
        this.$emit('change', newState)
      }
    }
  }
</script>
