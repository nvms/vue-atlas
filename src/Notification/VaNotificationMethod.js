import Vue from 'vue'
import VaNotification from './VaNotification.vue'

const createNode = () => {
  const $body = document.querySelector('body')
  const $node = document.createElement('div')
  $body.appendChild($node)
  return $node
}

const open = (options, type = 'info') => {
  const { title, message, effect, width, duration, onShow, onHide, onConfirm } = options
  /* eslint-disable no-new */

  new Vue({
    el: createNode(),
    data () {
      return {
        show: false,
        pc: 'va'
      }
    },
    mounted () {
      this.$refs.notification.open()
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
    },
    render (createElement) {
      return createElement(VaNotification, {
        ref: 'notification',
        props: {
          title,
          message,
          type: type || 'default',
          effect: effect || 'fade-right',
          width: width || '400px',
          duration: duration
        },
        on: {
          hide: this.handleHide,
          confirm: this.handleConfirm,
          show: this.handleShow,
          closed: this.destroy
        }
      }, [])
    }
  })
}
const info = (options) => { open(options, 'info') }
const success = (options) => { open(options, 'success') }
const warning = (options) => { open(options, 'warning') }
const danger = (options) => { open(options, 'danger') }

export default {
  info,
  success,
  warning,
  danger
}
