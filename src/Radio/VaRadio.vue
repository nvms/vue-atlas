<template>
  <label :class="`va-radio-con`">
    <span :class="objClass">
      <span
        :class="`va-radio-inner`"
        :tabindex="disabled ? -1 : 0"
        @keypress.space.prevent="handleClick"
        @keyup.enter="handleClick"
      />
      <input
        :checked="currentChecked"
        :class="`va-radio-input`"
        :disabled="disabled"
        :name="name"
        @click.prevent="handleClick"
        tabindex="-1"
        type="radio"
      >
    </span>
    <span :class="`va-label`" tabindex="-1">
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
      let { currentChecked, disabled } = this
      let classes = {}

      classes['va-radio-span'] = true
      classes['va-radio-checked'] = currentChecked
      classes['va-radio-disabled'] = disabled

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

.va-radio-con {
  margin-right: 10px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer !important;

  .va-label {
    margin-left: 8px;
    outline: none;
  }
  .va-radio-span {
    white-space: nowrap;
    outline: none;
    display: inline-block;
    position: relative;
    line-height: 1;
    vertical-align: middle;
  }
  .va-radio-inner {
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
    .va-radio-inner {
      background-color: $B75 !important;
      border-color: $B75 !important;
    }
  }
  .va-radio-input {
    position: absolute !important;
    left: 0;
    z-index: 1;
    cursor: pointer; // not inheriting pointer !important from -radio-con?
    opacity: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
  &:hover {
    .va-radio-span:not(.va-radio-checked) {
      .va-radio-inner {
        background-color: #ebecf0;
      }
    }
  }
  .va-radio-checked {
    &:hover {
      .va-radio-inner {
        background-color: $B300;
        border-color: $B300;
      }
    }
  }
  &:active {
    .va-radio-checked {
      .va-radio-inner {
        &:after {
          background-color: $B500;
        }
      }
    }
  }
  .va-radio-checked .va-radio-inner:after {
    transform: scale(1);
    opacity: 1;
  }
  .va-radio-checked .va-radio-inner {
    background-color: $B400;
    border-color: $B400;
  }
  .va-radio-inner:after {
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
  .va-radio-disabled .va-radio-inner {
    border-color: $N40;
    background-color: $N100;
  }
}

.va-radio-btn input[type='radio'] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
  pointer-events: none;
}

.va-radio-group {
  display: flex !important;
  flex-direction: row;
  &-vertical {
    display: flex;
    flex-direction: column;
  }
}
</style>
