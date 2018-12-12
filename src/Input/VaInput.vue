<template>
  <div :class="classObj" :style="{'width': width}" v-if="!showButtonsWarning">
    <input
      ref="input"
      auto-complete="off"
      :name="name"
      :class="inputClassObj"
      :style="{'width': width}"
      :readonly="readonly"
      :disabled="disabled"
      :placeholder="placeholder"
      :autofocus="autofocus"
      :type="type"
      @blur="blur"
      @focus="focus"
      @input="update($event.target.value)"
      tabindex="0"
      v-on:keyup.enter="enterPressed"
      v-model="currentValue"
      :value="value" />

    <va-input-ops
      v-if="buttons"
      :parent-position="position"
      @confirm="opsConfirm"
      @cancel="opsCancel"/>

    <va-icon
      v-if="showClean"
      type="times"
      icon-style="solid"
      :class="`${prefixCls}-input-show-clean`"
      @click.native.stop="clean"/>

    <va-icon
      v-if="icon !== undefined"
      :class="`${prefixCls}-input-show-icon`"
      :type="icon"
      :icon-style="iconStyle"/>

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

        Handle the <b>@confirm</b> event emitted by the input component, set the
        <b>loading</b> prop to true, <i>do some task</i>, and finally set the <b>loading</b>
        prop back to false.

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
// import { focus } from 'vue-focus'

export default {
  name: 'VaInput',
  mixins: [inputMixin, events],
  props: {
    value: {
      type: [String, Number]
    },
    size: {
      type: String
    },
    onChange: {
      type: Function
    },
    prefixCls: {
      type: String,
      default: 'va'
    },
    type: {
      type: String,
      default: 'text'
    },
    icon: {
      type: String
    },
    iconStyle: {
      type: String,
      default: 'regular',
      required: false
    },
    showClean: {
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
        ]
      }
    }
  },
  data () {
    let cv = this.value
    return {
      focused: false,
      currentValue: cv,
      position: {},
      showButtonsWarning: false
    }
  },
  created () {
    this.$on('Va@inputOpsCancel', (val) => { this.currentValue = val })
    this.$on('Va@inputOpsConfirm', (val) => { })
    this.$on('Va@inputOpsBlur', (val) => { this.focused = false })
  },
  mounted () {
    if (this.buttons && this.loading === undefined) {
      this.showButtonsWarning = true
    }
  },
  components: {
    validate
  },
  computed: {
    classObj () {
      let {prefixCls, validStatus, showClean, size, icon} = this
      let klass = {}

      klass[prefixCls + '-has-error'] = validStatus === 'error'
      klass[prefixCls + '-has-success'] = validStatus === 'success'
      klass[prefixCls + '-has-warn'] = validStatus === 'warn'
      klass[prefixCls + '-input-con'] = true
      klass[prefixCls + '-show-clean'] = showClean
      klass[prefixCls + '-show-icon'] = icon ? true : false
      size ? klass[prefixCls + '-input-' + size] = true : ''
      klass['inline'] = true

      return klass
    },
    inputClassObj () {
      let {prefixCls, theme} = this
      let klass = {}

      klass[prefixCls + '-form-control'] = true
      klass[prefixCls + '-form-control-' + theme] = true

      return klass
    }
  },
  watch: {
    loading (val) {
      this.broadcast('VaInputOps', 'Va@inputLoading', val)
    },
    currentValue (val) {
      this.broadcast('VaInputOps', 'Va@inputCurrentValueUpdate', val)
    }
  },
  methods: {
    clean () {
      this.$emit('input', '')
      this.$emit('clean')
    },
    update (val) {
      this.$emit('input', val)
      this.$emit('change', val)
      if (this.buttons) {
        this.broadcast('VaInputOps', 'Va@inputUpdate', this.currentValue)
      }
    },
    blur () {
      this.focused = false
      this.$emit('blur', this.value)
      if (this.buttons) {
        this.broadcast('VaInputOps', 'Va@inputBlur', this.currentValue)
      }
    },
    focus () {
      this.focused = true
      this.$emit('focus', this.value)
      if (this.buttons) {
        this.position = this.getPosition()
        this.broadcast('VaInputOps', 'Va@inputFocus', this.currentValue)
      }
    },
    enterPressed () {
      if (this.buttons) {
        this.broadcast('VaInputOps', 'Va@inputEnterPressed', this.currentValue)
      }
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
