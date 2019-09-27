<template>
  <label :class="classObj">
    <span>
      <span
        :class="`va-checkbox-inner`"
        :tabindex="disabled ? -1 : 0"
        @keypress.space.prevent="handleClick"
        @keyup.enter="enterPressed"
      >
        <va-icon :class="`va-checkbox-inner-check`" type="check"/>
      </span>
      <input
        :checked="currentChecked"
        :class="`va-checkbox-input`"
        :disabled="disabled"
        :name="name"
        @click="handleClick"
        tabindex="-1"
        type="checkbox"
      >
    </span>
    <span :class="`va-label`">
      <slot/>
    </span>
    <validate
      :current="currentChecked"
      :custom-validate="customValidate"
      :name="name"
      :rules="rules"
    />
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
      let { currentChecked, disabled } = this
      let classes = {}

      classes['va-checkbox-label'] = true
      classes['va-checkbox-checked'] = currentChecked
      classes['va-checkbox-disabled'] = disabled

      return classes
    }
  },
  created () {
    this.$on('Va@checkboxgroupChange', val => {
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

<style lang="scss">
@mixin checkbox-focus-mixin($color, $opacity: 0.6) {
  &:focus:not(:active):not(:hover),
  &-focused:not(:active):not(:hover) {
    box-shadow: $color 0px 0px 0px 2px; /* fallback */
    box-shadow: rgba($color, $opacity) 0px 0px 0px 2px;
    outline: none;
  }
}

.va-checkbox-label {
  white-space: nowrap;
  cursor: pointer;
  outline: none;
  display: inline-block;
  line-height: 1;
  position: relative;
  vertical-align: middle;
  margin-right: 10px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.va-checkbox-label:not(.va-checkbox-checked) {
  &:hover {
    .va-checkbox-inner {
      border-color: #dfe1e6;
      background-color: #ebecf0;
      &-check {
        color: #ebecf0;
      }
    }
  }
  &:active {
    .va-checkbox-inner {
      border-color: transparent;
      background-color: $B75;
      &-check {
        color: $B75;
      }
    }
  }
}

.va-checkbox-label.va-checkbox-checked {
  &:hover {
    .va-checkbox-inner {
      background-color: $B300;
      border-color: $B300;
    }
  }
  &:active {
    .va-checkbox-inner {
      background-color: $B75;
      border-color: $B75;
      &-check {
        color: $B500;
      }
    }
  }
}

.va-checkbox-inner {
  position: relative;
  top: 0;
  left: 0;
  display: inline-block;
  width: 17px;
  height: 17px;
  border-width: 2px;
  border-style: solid;
  border-radius: 3px;
  border-color: #dfe1e6;
  background-color: #fafbfc;
  transition: all 0.3s;
  &-check {
    color: #fafbfc;
    font-size: 9px !important;
    position: relative;
    top: -2px;
    left: 2px;
    transition: all 0.3s;
  }
  @include checkbox-focus-mixin($B200, 0.6);
}

.va-checkbox-input {
  position: absolute !important;
  left: 0;
  z-index: 1;
  cursor: pointer;
  opacity: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}

.va-checkbox-checked .va-checkbox-inner {
  border-color: $B400;
  background-color: $B400;
  &-check {
    color: $N0;
  }
}

.va-checkbox-disabled .va-checkbox-inner {
  border-color: $N500;
  background-color: $N500;
  i.va-checkbox-inner-check {
    color: $N500;
  }
}

.va-checkbox-disabled.va-checkbox-label:hover {
  &:hover {
    .va-checkbox-inner {
      background-color: $N500;
      border-color: $N500;
    }
    i.va-checkbox-inner-check {
      color: $N500;
    }
  }
}

.va-checkbox-disabled .va-checkbox-inner:after {
  display: none;
}

.va-checkbox-label span {
  vertical-align: top;
}

.va-checkbox-label span.va-label {
  margin-left: 7px;
  position: relative;
  top: 1px;
}

.va-checkbox-btn input[type='checkbox'] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
  pointer-events: none;
}

.va-checkbox-group {
  display: flex;
  flex-direction: row;
  &-vertical {
    display: flex;
    flex-direction: column;
    .va-checkbox-label {
      margin-bottom: 9px;
    }
  }
}
</style>
