<template>
  <div
    v-if="!showButtonsWarning"
    :class="classObjContainer"
    :style="styleObjContainer"
    ref="textareaContainer"
  >
    <textarea
      ref="textarea"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxLength"
      :style="styleObj"
      :class="classObj"
      :name="name"
      @input="update($event.target.value)"
      @focus="focus"
      @blur="blur"
      :placeholder="placeholder"
      @keydown.tab="kd_tab"
      v-bind="$attrs"
      v-model="currentValue"
    />

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
        <b>buttons</b> with this textarea component, you need
        to also use the
        <b>loading</b> prop.
        Handle the
        <b>@confirm</b> event emitted by the input component, set the
        <b>loading</b> prop to true,
        <i>do some task</i>, and finally set the
        <b>loading</b>
        prop back to false.
        It is important that events happen in that order, because the input component
        is watching the
        <b>loading</b> prop for those changes. That's how it knows to hide
        the confirm and cancel buttons.
      </p>
    </va-alert>
  </div>
</template>

<script>
import validate from '../validate.vue'
import validationMixin from '../Mixin/validationMixin'
import inputMixin from '../Mixin/inputMixin'
import events from '../utils/events'

export default {
  name: 'VaTextarea',
  mixins: [validationMixin, events, inputMixin],
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    placeholder: {
      type: String,
      default: '',
      required: false
    },
    resize: {
      type: Boolean,
      default: false,
      required: false
    },
    maxLength: {
      type: Number,
      required: false
    },
    maxHeight: {
      type: String,
      required: false,
      default: '200px'
    },
    minHeight: {
      type: String,
      required: false,
      default: '100px'
    },
    value: {
      type: String
    },
    readonly: {
      type: Boolean,
      default: false,
      required: false
    },
    disabled: {
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
    autosize: {
      type: Boolean,
      default: true
    }
  },
  data () {
    const cv = this.value
    return {
      focused: false,
      currentValue: cv,
      position: {},
      showButtonsWarning: false,
      desiredHeight: 0,
      inputWatch: null
    }
  },
  components: {
    validate
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
    // document.addEventListener('keyup', this.keyup)
  },
  beforeDestroy () {
    this.$refs.textarea.removeEventListener('input', this.resizeTextarea)
    window.removeEventListener('resize', this.setPosition, false)
    window.removeEventListener('scroll', this.setPosition, false)
    // document.removeEventListener('keyup', this.keyup)
  },
  mounted () {
    this.$refs.textarea.addEventListener('input', this.resizeTextarea)
    window.addEventListener('resize', this.setPosition, false)
    window.addEventListener('scroll', this.setPosition, false)

    if (this.buttons && this.loading === undefined) {
      this.showButtonsWarning = true
    }
    if (this.autosize) {
      this.$nextTick(() => {
        this.$refs.textareaContainer.style.height =
          this.$refs.textareaContainer.scrollHeight + 'px'
      })
    }
  },
  watch: {
    loading (val) {
      this.broadcast('VaInputOps', 'Va@inputLoading', val)
    },
    value (val) {
      this.currentValue = val

      /**
       * Sometimes the Textarea will have its value updated
       * using v-model, which won't trigger an input event,
       * which means resizeTextarea won't get called. We
       * manually trigger an input event so that this happens
       * after a very short wait.
       */
      setTimeout(() => {
        this.$refs.textarea.dispatchEvent(new Event('input'))
      }, 20)
    },
    currentValue (val) {
      this.broadcast('VaInputOps', 'Va@inputCurrentValueUpdate', val)
    }
  },
  methods: {
    kd_tab (e) {
      e.preventDefault()
      const textarea = this.$refs.textarea
      const start = textarea.selectionStart
      const end = textarea.selectionEnd

      const target = e.target
      const value = target.value

      target.value = value.substring(0, start) + '\t' + value.substring(end)

      textarea.selectionStart = textarea.selectionEnd = start + 1
    },
    update (val) {
      this.$emit('input', val)
      this.$emit('change', val)
      if (this.buttons) {
        this.broadcast('VaInputOps', 'Va@inputUpdate', this.currentValue)
      }
      /**
       * If a bunch of text was pasted into the input, we should wait a short bit
       * before updating the position of the element, so that inputOps can be
       * adjusted to the correct location.
       */
      setTimeout(() => {
        this.position = this.getPosition()
      }, 20)
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
        this.$refs.textarea.focus()
        this.$emit('focus', this.value)
        this.focused = true
        if (this.buttons) {
          this.position = this.getPosition()
          this.broadcast('VaInputOps', 'Va@inputFocus', this.currentValue)
        }
      }, 20)
    },
    blur () {
      this.focused = false
      this.$emit('blur', this.value)
      if (this.buttons) {
        this.broadcast('VaInputOps', 'Va@inputBlur', this.currentValue)
      }
    },
    enterPressed () {
      this.opsConfirm()
    },
    setPosition () {
      this.position = this.getPosition()
    },
    getPosition () {
      const rect = this.$refs.textarea.getBoundingClientRect()
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
    },
    resizeTextarea (event) {
      if (this.autosize) {
        this.$refs.textareaContainer.style.height = 'auto'
        this.$refs.textareaContainer.style.height =
          event.target.scrollHeight + 4 + 'px'
        this.position = this.getPosition()
      }
    }
  },
  computed: {
    styleObj () {
      const { resize, actualWidth } = this
      const style = {}

      style['resize'] = resize ? 'both' : 'none'
      style['width'] = actualWidth

      return style
    },
    classObj () {
      const classes = {}

      classes['va-form-control'] = true
      classes['va-textarea'] = true

      return classes
    },
    styleObjContainer () {
      const { minHeight, width } = this
      const style = {}

      style['width'] = width
      style['min-height'] = minHeight
      style['position'] = 'relative'

      return style
    },
    classObjContainer () {
      const { validStatus } = this
      const classes = {}

      classes['va-has-error'] = validStatus === 'error'
      classes['va-has-success'] = validStatus === 'success'
      classes['va-has-warn'] = validStatus === 'warn'
      classes['va-textarea-con'] = true
      // classes['inline'] = true

      return classes
    }
  }
}
</script>

<style lang="scss">
@import "../style/form";

.va-textarea-con {
  .va-form-control {
    line-height: 16px;
  }
}

.va-textarea {
  overflow-y: hidden;
  min-height: 50px;
  height: 100%;
}
</style>
