<template>
  <div :class="classObj" :style="{'width': actualWidth}" v-if="!showButtonsWarning">
    <span
      v-if="prefix !== ''"
      :class="`${classPrefix}-input-prefix`">
    {{prefix}}
    </span>
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
      :value="value" />
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
      :value="value" />
    <div :class="`${classPrefix}-input-icon-wrapper`" v-if="icon !== 'undefined' || clearable">
      <va-icon
        v-if="clearable"
        type="times"
        icon-style="solid"
        :class="`${classPrefix}-input-clearable`"
        @click.native.stop="clean"/>
      <va-icon
        :class="`${classPrefix}-input-show-icon`"
        :type="icon"
        :icon-style="iconStyle"/>
    </div>
    <span
      v-if="postfix !== ''"
      :class="`${classPrefix}-input-postfix`">
    {{postfix}}
    </span>
    <va-input-ops
      v-if="buttons"
      :parent-position="position"
      @confirm="opsConfirm"
      @cancel="opsCancel"/>
    <validate
      :name="name"
      v-model="validStatus"
      :rules="rules"
      :custom-validate="customValidate"
      :current="value" />
  </div>
  <div v-else>
    <va-alert type="warning">
      <h4>Hold on</h4>
      <p>
        If you're going to use <b>buttons</b> with this input component, you need
        to also use the <b>loading</b> prop.

        Handle the <b>@confirm</b> event emitted by the input component by setting the
        <b>loading</b> prop to true, <i>doing some task</i>, and finally setting the
        <b>loading</b> prop back to false.

        It is important that events happen in that order, because the input component
        is watching the <b>loading</b> prop for those changes. That's how it knows to hide
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
    },
    classPrefix: {
      type: String,
      default: 'va'
    }
  },
  data () {
    let cv = this.value
    return {
      focused: false,
      currentValue: cv,
      position: {},
      showButtonsWarning: false,
      autofilled: false
    }
  },
  created () {
    this.$on('Va@inputOpsCancel', (val) => { this.currentValue = val })
    this.$on('Va@inputOpsConfirm', () => { })
    this.$on('Va@inputOpsBlur', () => { this.focused = false })
    this.$on('Va@pageScroll', () => { this.setPosition() })
  },
  mounted () {
    window.addEventListener('resize', this.setPosition, false)
    window.addEventListener('scroll', this.setPosition, false)

    if (this.buttons && this.loading === undefined) {
      this.showButtonsWarning = true
    }

    if (this.autofocus) {
      this.focused = false
    }
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.setPosition, false)
  },
  components: {
    validate
  },
  computed: {
    inputStyleObj () {
      let {type} = this
      let style = {}

      if (type === 'file') {
        style['opacity'] = '0.2'
        style['z-index'] = '1'
        style['position'] = 'absolute'
      }
      style['width'] = this.actualWidth

      return style
    },
    classObj () {
      let {classPrefix, validStatus, clearable, size, icon, prefix, postfix, type} = this
      let classes = {}

      classes[classPrefix + '-has-error'] = validStatus === 'error'
      classes[classPrefix + '-has-success'] = validStatus === 'success'
      classes[classPrefix + '-has-warn'] = validStatus === 'warn'
      classes[classPrefix + '-input-con'] = true
      classes[classPrefix + '-clearable'] = clearable
      classes[classPrefix + '-show-icon'] = icon ? true : false
      size ? classes[classPrefix + '-input-' + size] = true : ''
      classes[classPrefix + '-input-has-prefix'] = prefix !== '' ? true : false
      classes[classPrefix + '-input-has-postfix'] = postfix !== '' ? true : false
      classes[classPrefix + '-input-file'] = type === 'file' ? true : false
      classes['inline'] = true

      return classes
    },
    inputClassObj () {
      let {classPrefix, theme} = this
      let classes = {}

      classes[classPrefix + '-form-control'] = true
      classes[classPrefix + '-form-control-' + theme] = true

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
    onBlur (e) {
      this.$emit('blur', this.value)
      if (this.buttons) {
        this.broadcast('VaInputOps', 'Va@inputBlur', this.currentValue)
      }
    },
    blur (e) {
      this.focused = false
    },
    onFocus (e) {
      this.$emit('focus', this.value)
      if (this.buttons) {
        this.position = this.getPosition()
        this.broadcast('VaInputOps', 'Va@inputFocus', this.currentValue)
      }
    },
    focus (e) {
      setTimeout(() => {
        this.focused = true
        this.$refs.input.focus()
      }, 50)
    },
    enterPressed () {
      this.opsConfirm()
    },
    setPosition () {
      this.position = this.getPosition()
    },
    getPosition () {
      let rect = this.$refs.input.getBoundingClientRect()
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
