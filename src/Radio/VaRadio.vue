<template>
  <label class="va-radio-con">
    <span :class="objClass">
      <span
        class="va-radio-inner"
        :tabindex="disabled ? -1 : 0"
        @keypress.space.prevent="handleClick"
        @keyup.enter="handleClick"
      />
      <input
        :checked="currentChecked"
        class="va-radio-input"
        :disabled="disabled"
        :name="name"
        @click.prevent="handleClick"
        tabindex="-1"
        type="radio"
      >
    </span>
    <span class="va-label" tabindex="-1">
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
      const { currentChecked, disabled } = this
      const classes = {}

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

<style lang="scss" src="../style/_reset.scss" scoped></style>
<style lang="scss">
@import "../variables";

.va-radio-con {
  margin-right: 10px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;

  .va-label {
    margin-left: 7px;
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
    width: 14px;
    height: 14px;
    border-width: 1px;
    border-style: solid;
    border-radius: 15px;
    border-color: $N60;
    background-color: $N10;
  }
  &:active {
    .va-radio-inner {
      background-color: $B75 !important;
      border-color: $B300 !important;
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
        background-color: $N300;
        border-color: $N300;
      }
    }
  }
  &:active {
    .va-radio-checked {
      .va-radio-inner {
        &:after {
          background-color: $N0;
        }
      }
    }
  }
  .va-radio-checked .va-radio-inner:after {
    transform: scale(1);
    opacity: 1;
  }
  .va-radio-checked .va-radio-inner {
    background-color: $N400;
    border-color: $N400;
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
    border-color: $N80 !important;
    background-color: $N80 !important;
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
