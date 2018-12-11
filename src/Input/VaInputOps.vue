<template>
  <div>
    needToSave: {{needToSave}}
    <div ref="popup" v-show="show" :style="styleObj" :class="classObj">
      <va-button
        :loading="loading"
        type="default"
        @click.native="confirm"
        style="margin-right: 3px;">
        <va-icon type="check" size="10px"></va-icon>
      </va-button>
      <va-button
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
      needToSave: false,
      position: {},
      loading: false
    }
  },
  created () {
    this.$on('Va@inputBlur', (val) => {
      if (val === this.initialValue) {
        this.show = false
        this.needToSave = false
      } else {
        this.needToSave = true
      }
    })
    this.$on('Va@inputFocus', (val) => {
      if (!this.needToSave) {
        this.initialValue = val
        this.show = true
        // the element needs to be on the DOM before we can get its position
        setTimeout(() => {
          this.position = this.getPosition()
        }, 5)
      }
    })
    this.$on('Va@inputLoading', (val) => {
      this.loading = val
    })
    this.$on('Va@inputUpdate', (val) => {
      if (val === this.initialValue) {
        this.needToSave = false
      } else {
        this.needToSave = true
      }
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

      style['position'] = 'absolute'
      style['z-index'] = '99999'
      style['background'] = '#FFFFFF'
      style['top'] = (parentPosition.top + parentPosition.height + 3) + 'px'
      style['left'] = parentPosition.left + (parentPosition.width - position.width) + 'px'

      return style
    }
  },
  watch: {
    loading (val) {
      if (val === false && this.show === true) {
        this.show = false
        this.needToSave = false
      }
    }
  }
}
</script>
