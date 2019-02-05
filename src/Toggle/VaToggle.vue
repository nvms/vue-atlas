<template>
    <label :class="classObj" @click.prevent>
        <input :checked="value"
               :class="`${prefixCls}-toggle__input`"
               :name="name"
               @keypress.space.prevent="toggle"
               tabindex="-1"
               type="checkbox">
        <div :aria-label="label"
             :class="`${prefixCls}-toggle__slide`"
             :tabindex="disabled ? -1 : 0"
             @click="toggle"
             @keypress.space.prevent="toggle">
            <div :class="`${prefixCls}-toggle__inner`">
                <span :class="`${prefixCls}-toggle__handle`"></span>
                <span :class="`${prefixCls}-toggle__icon`">
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
      prefixCls: {
        type: String,
        default: 'va'
      }
    },
    computed: {
      classObj() {
        let classes = {}
        classes[this.prefixCls + '-toggle'] = true
        classes[this.prefixCls + '-toggle--checked'] = this.value
        classes[this.prefixCls + '-toggle--disabled'] = this.disabled
        classes[this.prefixCls + '-toggle--lg'] = this.size === 'lg'
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
