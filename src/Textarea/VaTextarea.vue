<template>
  <div
    v-if="!showButtonsWarning"
    :class="classObjContainer"
    :style="styleObjContainer"
    ref="textareaContainer">
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
      v-model="currentValue">
    </textarea>

    <!-- v-on:keyup.enter="enterPressed" -->

    <va-input-ops
      v-if="buttons"
      :parent-position="position"
      @confirm="opsConfirm"
      @cancel="opsCancel"/>

    <validate
      :name="name"
      :rules="rules"
      :custom-validate="customValidate"
      :current="value">
    </validate>
  </div>
  <div v-else>
    <va-alert type="warning">
      <h4>Hold on</h4>
      <p>
        If you're going to use <b>buttons</b> with this textarea component, you need
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
import validate from '../validate.vue'
import validationMixin from '../Mixin/validationMixin'
import events from '../utils/events'

export default {
  name: 'VaTextarea',
  mixins: [validationMixin, events],
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
      default: true,
      required: false
    },
    maxLength: {
      type: Number,
      required: false
    },
    width: {
      type: String,
      default: '220px',
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
      showButtonsWarning: false,
      desiredHeight: 0,
      inputWatch: null
    }
  },
  components: {
    validate
  },
  created () {
    this.$on('Va@inputOpsCancel', (val) => { this.currentValue = val })
    this.$on('Va@inputOpsConfirm', (val) => { })
    this.$on('Va@inputOpsBlur', (val) => { this.focused = false })
    this.$on('Va@pageScroll', (val) => { this.setPosition() })
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
        this.$refs.textareaContainer.style.height = this.$refs.textareaContainer.scrollHeight + 'px'
      })
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
    kd_tab (e) {
      e.preventDefault()
      let textarea = this.$refs.textarea
      let start = textarea.selectionStart
      let end = textarea.selectionEnd

      let target = e.target
      let value = target.value

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
      let rect = this.$refs.textarea.getBoundingClientRect()
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
        // event.target.style.height = 'auto'
        // event.target.style.height = (event.target.scrollHeight + 4) + 'px'
        this.$refs.textareaContainer.style.height = 'auto'
        this.$refs.textareaContainer.style.height = (event.target.scrollHeight + 4) + 'px'

        this.position = this.getPosition()

        console.log('this.position is', this.position)
      }
    }
  },
  computed: {
    styleObj () {
      let {resize} = this
      let style = {}

      style['resize'] = resize ? 'both' : 'none'

      return style
    },
    classObj () {
      let {prefixCls} = this
      let klass = {}

      klass[prefixCls + '-form-control'] = true
      klass[prefixCls + '-textarea'] = true

      return klass
    },
    styleObjContainer () {
      let {minHeight, width} = this
      let style = {}

      style['width'] = width
      style['min-height'] = minHeight

      return style
    },
    classObjContainer () {
      let {prefixCls} = this
      let klass = {}

      klass[prefixCls + '-textarea-con'] = true
      // klass['inline'] = true

      return klass
    }
  }
}
</script>
