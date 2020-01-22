<template>
  <div
    :class="classObj"
    :style="{'width': actualWidth}"
    v-if="!showButtonsWarning"
  >
    <span v-if="prefix !== ''" class="va-input-prefix">{{prefix}}</span>
    <input
      v-if="noVModel"
      ref="input"
      v-bind="$attrs"
      :name="name"
      :class="inputClassObj"
      :style="inputStyleObj"
      :readonly="readonly"
      :disabled="disabled"
      :placeholder="placeholder"
      :autofocus="autofocus"
      :type="type"
      @blur="onBlur"
      @focus="onFocus"
      @input="update($event.target.value)"
      tabindex="0"
      @keyup.enter="enterPressed"
      :value="value"
    >
    <input
      v-else
      ref="input"
      v-bind="$attrs"
      :name="name"
      :class="inputClassObj"
      :style="inputStyleObj"
      :readonly="readonly"
      :disabled="disabled"
      :placeholder="placeholder"
      :autofocus="autofocus"
      :type="type"
      @blur="onBlur"
      @focus="onFocus"
      @input="update($event.target.value)"
      tabindex="0"
      @keyup.enter="enterPressed"
      v-model="currentValue"
      :value="value"
    >
    <div
      class="va-input-icon-wrapper"
      v-if="icon !== 'undefined' || clearable"
    >
      <va-icon
        v-if="clearable"
        type="times"
        icon-style="solid"
        class="va-input-clearable"
        @click.native.stop="clean"
      />
      <va-icon
        class="va-input-show-icon"
        :type="icon"
        :icon-style="iconStyle"
      />
    </div>
    <span
      v-if="postfix !== ''"
      class="va-input-postfix"
    >{{postfix}}</span>
    <va-input-ops
      v-if="buttons"
      :parent-position="position"
      @confirm="opsConfirm"
      @cancel="opsCancel"
    />
    <validate
      :name="name"
      v-model="validStatus"
      :rules="rules"
      :custom-validate="customValidate"
      :current="value"
    />
  </div>
  <div v-else>
    <va-alert type="warning">
      <h4>Hold on</h4>
      <p>
        If you're going to use
        <b>buttons</b> with this input component, you need
        to also use the
        <b>loading</b> prop.
        Handle the
        <b>@confirm</b> event emitted by the input component by setting the
        <b>loading</b> prop to true,
        <i>doing some task</i>, and finally setting the
        <b>loading</b> prop back to false.
        It is important that events happen in that order, because the input component
        is watching the
        <b>loading</b> prop for those changes. That's how it knows to hide
        the confirm and cancel buttons.
      </p>
    </va-alert>
  </div>
</template>

<script>
import inputMixin from '../Mixin/inputMixin'
import validate from '../validate.vue'
import events from '../utils/events'

export default {
  name: 'VaInput',
  mixins: [inputMixin, events],
  inheritAttrs: false,
  props: {
    value: {},
    size: {
      type: String
    },
    onChange: {
      type: Function
    },
    type: {
      type: String,
      default: 'text'
    },
    icon: {
      type: String,
      default: 'undefined'
    },
    iconStyle: {
      type: String,
      default: 'regular',
      required: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false,
      required: false
    },
    buttons: {
      type: Boolean,
      default: false,
      required: false
    },
    loading: {
      type: Boolean,
      default: undefined
    },
    prefix: {
      type: String,
      default: '',
      required: false
    },
    postfix: {
      type: String,
      default: '',
      required: false
    },
    noVModel: {
      type: Boolean,
      default: false,
      required: false
    },
    theme: {
      type: String,
      default: 'primary',
      required: false,
      validator (v) {
        return [
          'default',
          'primary',
          'success',
          'warning',
          'danger',
          'purple'
        ].includes(v)
      }
    }
  },
  data () {
    const cv = this.value
    return {
      focused: false,
      currentValue: cv,
      position: {},
      showButtonsWarning: false,
      autofilled: false
    }
  },
  created () {
    this.$on('Va@inputOpsCancel', val => {
      this.currentValue = val
    })
    this.$on('Va@inputOpsConfirm', () => {})
    this.$on('Va@inputOpsBlur', () => {
      this.focused = false
    })
    this.$on('Va@pageScroll', () => {
      this.setPosition()
    })
  },
  mounted () {
    window.addEventListener('resize', this.setPosition, false)
    window.addEventListener('scroll', this.setPosition, false)

    if (this.buttons && this.loading === undefined) {
      this.showButtonsWarning = true
    }

    if (this.autofocus) {
      this.focused = true
    }
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.setPosition, false)
    window.removeEventListener('resize', this.setPosition, false)
  },
  components: {
    validate
  },
  computed: {
    inputStyleObj () {
      const { type } = this
      const style = {}

      if (type === 'file') {
        style['opacity'] = '0.2'
        style['z-index'] = '1'
        style['position'] = 'absolute'
      }
      style['width'] = this.actualWidth

      return style
    },
    classObj () {
      const { validStatus, clearable, size, icon, prefix, postfix, type } = this
      const classes = {}

      classes['va-has-error'] = validStatus === 'error'
      classes['va-has-success'] = validStatus === 'success'
      classes['va-has-warn'] = validStatus === 'warn'
      classes['va-input-con'] = true
      classes['va-clearable'] = clearable
      classes['va-show-icon'] = !!icon
      size ? (classes['va-input-' + size] = true) : ''
      classes['va-input-has-prefix'] = prefix !== ''
      classes['va-input-has-postfix'] =
        postfix !== ''
      classes['va-input-file'] = type === 'file'
      classes['inline'] = true

      return classes
    },
    inputClassObj () {
      const { theme } = this
      const classes = {}

      classes['va-form-control'] = true
      classes['va-form-control-' + theme] = true

      return classes
    }
  },
  watch: {
    loading (val) {
      this.broadcast('VaInputOps', 'Va@inputLoading', val)
    },
    currentValue (val) {
      this.broadcast('VaInputOps', 'Va@inputCurrentValueUpdate', val)
    },
    value (val) {
      this.currentValue = val
      this.$refs.input.value = val
    }
  },
  methods: {
    clean () {
      this.$emit('input', '')
      this.$emit('clean')
      this.$refs.input.value = ''
      this.$refs.input.focus()
    },
    update (val) {
      this.$emit('input', val)
      this.$emit('change', val)
      if (this.buttons) {
        this.broadcast('VaInputOps', 'Va@inputUpdate', this.currentValue)
      }
    },
    onBlur () {
      this.$emit('blur', this.value)
      if (this.buttons) {
        this.broadcast('VaInputOps', 'Va@inputBlur', this.currentValue)
      }
    },
    blur () {
      this.focused = false
    },
    onFocus () {
      this.$emit('focus', this.value)
      if (this.buttons) {
        this.position = this.getPosition()
        this.broadcast('VaInputOps', 'Va@inputFocus', this.currentValue)
      }
    },
    focus () {
      setTimeout(() => {
        this.focused = true
        this.$refs.input.focus()
      }, 50)
    },
    enterPressed (e) {
      this.$emit('keyup', e)
      this.opsConfirm()
    },
    setPosition () {
      this.position = this.getPosition()
    },
    getPosition () {
      const rect = this.$refs.input.getBoundingClientRect()
      return {
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        x: rect.x,
        y: rect.y
      }
    },
    opsConfirm () {
      this.$emit('confirm', this.value)
    },
    opsCancel () {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss">
@import "../style/form";

@mixin input-theme-mixin($iconColor, $iconHoverColor, $iconActiveColor) {
  .va-input-clearable,
  .va-input-show-icon {
    color: $iconColor;
  }

  .va-input-clearable {
    &:hover {
      color: $iconHoverColor;
    }

    &:active,
    &:focus {
      color: $iconActiveColor;
    }
  }
}

@mixin input-ops-theme-mixin($opsBackground, $opsBtnBoxShadow) {
  background: $opsBackground;

  .va-btn {
    box-shadow: $opsBtnBoxShadow;
  }
}

.va-input,
.va--theme-light.va-input {
  &-con {
    @include input-theme-mixin(
      $iconColor: $N80,
      $iconHoverColor: $N100,
      $iconActiveColor: $B100
    );
  }
  &-ops {
    @include input-ops-theme-mixin(
      $opsBackground: transparent,
      $opsBtnBoxShadow: (
        0 2px 4px -1px rgba(9, 30, 66, 0.25),
        0 0 1px rgba(9, 30, 66, 0.25)
      )
    );
  }
}

.va-input-con {
  position: relative;
  display: flex;

  &:hover {
    .va-input-clearable {
      opacity: 1;
    }
  }
}

.va-clearable:hover .va-input-show-icon {
  display: none;
}

/*the icon*/

.va-input-icon-wrapper {
  position: absolute;
  top: 0px;
  right: 0px;
  height: 100%;
  width: 30px;
}

.va-input-file {
  overflow: hidden;
}

.va-input-clearable,
.va-input-show-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 26px;
  padding: 0;
  -webkit-transition: opacity 0.15s linear;
  transition: opacity 0.15s linear;
}

.va-input-clearable {
  opacity: 0;
  cursor: default;
}

.va-input-show-icon {
  opacity: 1;
}

/*positioning the icon based on input size*/

/*sm*/

.va-input-sm {
  .va-input-icon-wrapper {
    i {
      top: 8px;
    }
  }
}

/*xs*/

.va-input-xs {
  .va-input-icon-wrapper {
    i {
      font-size: 12px !important;
      top: 8px;
    }
  }
}

.va-input-ops {
  position: absolute;
  z-index: 4;
}

.va-input-prefix,
.va-input-postfix {
  display: flex;
  background: #f4f5f7;
  border: 2px solid $N40;
  line-height: 2.15em;
  padding: 0 8px;
  color: $N300;
  white-space: nowrap;
}
.va-input-prefix {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-right: 0;
}
.va-input-postfix {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-left: 0;
}

.va-input-has-prefix {
  .va-form-control {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
}
.va-input-has-postfix {
  .va-form-control {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }
}

.va-input-has-postfix {
  .va-input-icon-wrapper {
    position: relative;
    width: initial;
    left: initial;
    right: initial;
  }
}
</style>
