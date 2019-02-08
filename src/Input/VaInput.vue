<template>
  <div :class="classObj" :style="{'width': width}" v-if="!showButtonsWarning">
    <input
      v-if="noVModel"
      ref="input"
      v-bind="$attrs"
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
      @keyup.enter="enterPressed"
      :value="value" />

    <input
      v-else
      ref="input"
      v-bind="$attrs"
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
      @keyup.enter="enterPressed"
      v-model="currentValue"
      :value="value" />

    <va-input-ops
      v-if="buttons"
      :parent-position="position"
      @confirm="opsConfirm"
      @cancel="opsCancel"/>

    <div :class="`${prefixCls}-input-icon-wrapper`">

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

    </div>

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
    value: {
      type: [String, Number]
    },
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
    prefixCls: {
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
      showButtonsWarning: false
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
      this.focused = true
    }
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.setPosition, false)
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
    },
    value (val) {
      this.currentValue = val
    }
  },
  methods: {
    clean () {
      this.$emit('input', '')
      this.$emit('clean')
      this.$refs.input.focus()
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
      /**
       * This setTimeout exists because sometimes you'll want to call
       * this.$refs.input.focus() when the input is inside of something
       * like, say, a dropdown. We need to give the element time to be
       * added to the DOM before we send a focus event to it.
       * 
       * This short timeout provides, what seems like, a fine amount of
       * time for this to happen without being noticable by the human eye.
       */
      setTimeout(() => {
        this.$refs.input.focus()
        this.$emit('focus', this.value)
        this.focused = true
        if (this.buttons) {
          this.position = this.getPosition()
          this.broadcast('VaInputOps', 'Va@inputFocus', this.currentValue)
        }
      }, 20)
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
