<template>
  <label :class="`${classPrefix}-radio-con`">
    <span :class="objClass">
      <span
        :class="`${classPrefix}-radio-inner`"
        :tabindex="disabled ? -1 : 0"
        @keypress.space.prevent="handleClick"
        @keyup.enter="handleClick"
      />
      <input
        :checked="currentChecked"
        :class="`${classPrefix}-radio-input`"
        :disabled="disabled"
        :name="name"
        @click.prevent="handleClick"
        tabindex="-1"
        type="radio"
      >
    </span>
    <span :class="`${classPrefix}-label`" tabindex="-1">
      <slot/>
    </span>
    <validate
      :current="checked"
      :custom-validate="customValidate"
      :name="name"
      :rules="rules"
    />
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
    objClass () {
      let { classPrefix, currentChecked, disabled } = this
      let classes = {}

      classes[classPrefix + '-radio-span'] = true
      classes[classPrefix + '-radio-checked'] = currentChecked
      classes[classPrefix + '-radio-disabled'] = disabled

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
  created () {
    this.$on('Va@radiogroupChange', val => {
      // this.currentChecked = val.indexOf(this.label) > -1
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

<style lang="scss">
@mixin radio-focus-mixin($color, $opacity: 0.6) {
  &:focus:not(:active):not(:hover),
  &-focused:not(:active):not(:hover) {
    box-shadow: $color 0px 0px 0px 2px; /* fallback */
    box-shadow: rgba($color, $opacity) 0px 0px 0px 2px;
    outline: none;
  }
}

.#{$class-prefix}-radio-con {
  margin-right: 10px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  .#{$class-prefix}-label {
    margin-left: 8px;
    outline: none;
  }
  &:hover {
    cursor: default;
  }
  .#{$class-prefix}-radio-span {
    white-space: nowrap;
    outline: none;
    display: inline-block;
    position: relative;
    line-height: 1;
    vertical-align: middle;
  }
  .#{$class-prefix}-radio-inner {
    position: relative;
    top: 0;
    left: 0;
    display: inline-block;
    width: 16px;
    height: 16px;
    border-width: 2px;
    border-style: solid;
    border-radius: 14px;
    border-color: #dfe1e6;
    background-color: #fafbfc;
    transition: all 0.3s;
    @include radio-focus-mixin($B200, 0.6);
  }
  &:active {
    .#{$class-prefix}-radio-inner {
      background-color: $B75 !important;
      border-color: $B75 !important;
    }
  }
  .#{$class-prefix}-radio-input {
    position: absolute !important;
    left: 0;
    z-index: 1;
    cursor: default;
    opacity: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
  &:hover {
    .#{$class-prefix}-radio-span:not(.#{$class-prefix}-radio-checked) {
      .#{$class-prefix}-radio-inner {
        background-color: #ebecf0;
      }
    }
  }
  .#{$class-prefix}-radio-checked {
    &:hover {
      .#{$class-prefix}-radio-inner {
        background-color: $B300;
        border-color: $B300;
      }
    }
  }
  &:active {
    .#{$class-prefix}-radio-checked {
      .#{$class-prefix}-radio-inner {
        &:after {
          background-color: $B500;
        }
      }
    }
  }
  .#{$class-prefix}-radio-checked .#{$class-prefix}-radio-inner:after {
    transform: scale(1);
    opacity: 1;
  }
  .#{$class-prefix}-radio-checked .#{$class-prefix}-radio-inner {
    background-color: $B400;
    border-color: $B400;
  }
  .#{$class-prefix}-radio-inner:after {
    position: absolute;
    width: 4px;
    height: 4px;
    left: 4px;
    top: 4px;
    border-radius: 6px;
    display: table;
    border-top: 0;
    border-left: 0;
    content: ' ';
    background-color: $N0;
    transform: scale(0);
    opacity: 0;
  }
  .#{$class-prefix}-radio-disabled .#{$class-prefix}-radio-inner {
    border-color: $N40;
    background-color: $N100;
  }
}

.#{$class-prefix}-radio-btn input[type='radio'] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
  pointer-events: none;
}

.#{$class-prefix}-radio-group {
  display: flex !important;
  flex-direction: row;
  &-vertical {
    display: flex;
    flex-direction: column;
  }
}
</style>
