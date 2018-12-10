import Vue from 'vue'
import VaNotification from './VaNotification.vue'

const $body = document.querySelector('body')

const createNode = () => {
  const $node = document.createElement('div')
  $body.appendChild($node)
  return $node
}

const typeMap = {
  default: {
    name: 'default'
  },
  success: {
    name: 'success'
  },
  warning: {
    name: 'warning'
  },
  danger: {
    name: 'danger'
  },
  info: {
    name: 'info'
  }
}

const alert = (options) => {

}

const open = (options) => {
  let {title, message, effect, type, prefixCls, width, onShow, onHide, onConfirm} = options
  new Vue({
    el: createNode(),
    data () {
      return {
        show: false,
        pc: 'va'
      }
    },
    components: {
      VaNotification
    },
    template: `<VaNotification title="${title}"
      message="${message}"
      type="${type ? type : 'default'}"
      effect="${effect || 'fade-right'}"
      ref="notification"
      ${width ? 'width="' + width + '"' : ''}
      @hide="handleHide"
      @confirm="handleConfirm"
      @show="handleShow"
      @closed="destroy">
      </VaNotification>`,
    mounted () {
      if (prefixCls) {
        this.pc = prefixCls
      }
      this.$nextTick(() => {
        this.$refs.notification.open()
      })
    },
    destroyed () {},
    computed: {
    },
    methods: {
      handleShow () {
        onShow && onShow()
      },
      handleConfirm () {
        onConfirm && onConfirm()
        this.$refs.notification.close()
      },
      handleHide () {
        onHide && onHide()
      },
      handleClose () {
        this.$refs.notification.close()
      },
      destroy () {
        this.$destroy()
      }
    }
  })
}

export default {
  alert,
  open
}