<template>
  <div>
    <div ref="popup" v-show="show" :style="styleObj" :class="classObj">
      <va-button
        ref="confirmButton"
        :loading="loading"
        type="default"
        @click.native="confirmClicked"
        style="margin-right: 3px;">
        <va-icon type="check" size="10px"></va-icon>
      </va-button>
      <va-button
        ref="cancelButton"
        type="default"
        @click.native="cancel">
        <va-icon type="times" size="10px"></va-icon>
      </va-button>
    </div>
  </div>
</template>

<script>
import events from '../utils/events'

export default {
  name: 'VaInputOps',
  mixins: [events],
  props: {
    parentPosition: {
      type: Object
    },
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  data () {
    return {
      show: false,
      initialValue: '',
      currentValue: '',
      needToSave: false,
      position: {},
      shouldBlur: false,
      loading: false
    }
  },
  created () {
    this.$on('Va@inputBlur', (val) => { this.handleBlur(val) })
    this.$on('Va@inputFocus', (val) => { this.handleFocus(val) })
    this.$on('Va@inputLoading', (val) => { this.handleInputLoading(val) })
    this.$on('Va@inputUpdate', (val) => { this.handleInputUpdate(val) })
    this.$on('Va@inputEnterPressed', (val) => { this.handleEnterPressed(val) })
    this.$on('Va@inputCurrentValueUpdate', (val) => { this.handleCurrentValueUpdate(val) })
  },
  mounted () {
    const $body = document.querySelector('body')
    $body.appendChild(this.$refs.popup)
  },
  beforeDestroy () {
    const $body = document.querySelector('body')
    $body.removeChild(this.$refs.popup)
  },
  methods: {
    confirmClicked () {
      this.shouldBlur = true
      this.confirm()
    },
    confirm () {
      this.$emit('confirm')
      this.dispatch('VaInput', 'Va@inputOpsConfirm', true)
    },
    cancel () {
      this.$emit('cancel')
      this.needToSave = false
      this.dispatch('VaInput', 'Va@inputOpsCancel', this.initialValue)
      this.show = false
    },
    handleBlur (val) {
      if (val === this.initialValue) {
        this.show = false
        this.needToSave = false
        this.shouldBlur = true
      } else {
        this.needToSave = true
      }
    },
    handleFocus (val) {
      this.shouldBlur = false
      if (!this.needToSave) {
        this.initialValue = val
        this.show = true
        // the element needs to be on the DOM before we can get its position
        setTimeout(() => {
          this.position = this.getPosition()
        }, 10)
      }
    },
    handleInputLoading (val) {
      this.loading = val
    },
    handleInputUpdate (val) {
      if (val === this.initialValue) {
        this.needToSave = false
      } else {
        this.needToSave = true
      }
    },
    handleCurrentValueUpdate (val) {
      this.currentValue = val
    },
    handleEnterPressed (val) {
      this.confirm()
    },
    getPosition () {
      let rect = this.$refs.popup.getBoundingClientRect()
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
    }
  },
  computed: {
    classObj () {
      let {prefixCls} = this
      let klass = {}

      klass[prefixCls + '-input-ops'] = true

      return klass
    },
    styleObj () {
      let style = {}
      let parentPosition = this.parentPosition
      let position = this.position

      style['top'] = (parentPosition.top + parentPosition.height + 3) + 'px'
      style['left'] = parentPosition.left + (parentPosition.width - position.width) + 'px'

      return style
    }
  },
  watch: {
    loading (val) {
      if (val === false && this.show === true) {
        if (this.shouldBlur) {
          this.show = false
          this.shouldBlur = false
        }
        this.needToSave = false
        this.initialValue = this.currentValue
      }
    },
    needToSave (val) {
      if (val) {
        this.show = true
      }
    }
  }
}
</script>
