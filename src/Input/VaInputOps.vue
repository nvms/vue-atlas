<template>
  <transition name="fadeUp">
    <div ref="popup" v-show="show" :style="styleObj" :class="classObj">
      <va-button
        size="sm"
        ref="confirmButton"
        :loading="loading"
        type="default"
        @click.native="confirmClicked"
        style="margin-right: 3px;"
      >
        <va-icon type="check" size="10px"/>
      </va-button>
      <va-button
        size="sm"
        :style="{ visibility: loading ? 'hidden' : 'visible' }"
        ref="cancelButton"
        type="default"
        @click.native="cancel"
      >
        <va-icon type="times" size="10px"/>
      </va-button>
    </div>
  </transition>
</template>

<script>
import events from '../utils/events'

export default {
  name: 'VaInputOps',
  mixins: [events],
  props: {
    parentPosition: {
      type: Object
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
      loading: false,
      opacity: false /* exists to hide element until getPosition finishes to prevent flicker */
    }
  },
  created () {
    this.$on('Va@inputBlur', val => {
      this.handleBlur(val)
    })
    this.$on('Va@inputFocus', val => {
      this.handleFocus(val)
    })
    this.$on('Va@inputLoading', val => {
      this.handleInputLoading(val)
    })
    this.$on('Va@inputUpdate', val => {
      this.handleInputUpdate(val)
    })
    this.$on('Va@inputEnterPressed', val => {
      this.handleEnterPressed(val)
    })
    this.$on('Va@inputCurrentValueUpdate', val => {
      this.handleCurrentValueUpdate(val)
    })
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
      if (this.initialValue !== this.currentValue) {
        this.$emit('confirm')
        this.dispatch('VaInput', 'Va@inputOpsConfirm', true)
        this.dispatch('VaTextarea', 'Va@inputOpsConfirm', true)
      }
    },
    cancel () {
      this.$emit('cancel')
      this.needToSave = false
      this.dispatch('VaInput', 'Va@inputOpsCancel', this.initialValue)
      this.dispatch('VaTextarea', 'Va@inputOpsCancel', this.initialValue)
      this.show = false
    },
    handleBlur (val) {
      if (val === this.initialValue) {
        this.show = false
        this.needToSave = false
      } else {
        this.needToSave = true
      }
      this.shouldBlur = true
    },
    handleFocus (val) {
      this.shouldBlur = false
      if (!this.needToSave) {
        this.initialValue = val
        this.currentValue = val
        this.show = true
        /**
         * This short timeout provides, what seems like, a fine amount of
         * time for this element to be inserted into the DOM. When it's not
         * on the DOM, there's no position to get.
         */
        setTimeout(() => {
          this.setPosition()
          this.opacity = true
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
    handleEnterPressed () {
      this.confirm()
    },
    setPosition () {
      this.position = this.getPosition()
    },
    getPosition () {
      const rect = this.$refs.popup.getBoundingClientRect()
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
      const classes = {}

      classes['va-input-ops'] = true

      return classes
    },
    styleObj () {
      const style = {}
      const opacity = this.opacity
      const parentPosition = this.parentPosition
      const position = this.position

      style['position'] = 'fixed'
      style['top'] = parentPosition.top + parentPosition.height + 3 + 'px'
      style['left'] =
        parentPosition.left + (parentPosition.width - position.width) + 'px'
      style['opacity'] = opacity ? '1' : '0'

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
    },
    show (val) {
      if (!val) {
        this.opacity = false
      }
    }
  }
}
</script>
