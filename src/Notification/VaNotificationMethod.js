import Vue from 'vue'
import VaNotification from './VaNotification.vue'

const $body = document.querySelector('body')

const createNode = () => {
  const $node = document.createElement('div')
  $body.appendChild($node)
  return $node
}

const open = (options) => {
  let {title, message, effect, type, width, onShow, onHide, onConfirm} = options
  new Vue({
    el: createNode(),
    data() {
      return {
        show: false,
        pc: 'va'
      }
    },
    mounted() {
      this.$refs.notification.open()
    },
    methods: {
      handleShow() {
        onShow && onShow()
      },
      handleConfirm() {
        onConfirm && onConfirm()
        this.$refs.notification.close()
      },
      handleHide() {
        onHide && onHide()
      },
      handleClose() {
        this.$refs.notification.close()
      },
      destroy() {
        this.$destroy()
      }
    },
    render(createElement) {
      return createElement(VaNotification, {
        ref: 'notification',
        props: {
          title,
          message,
          type: type ? type : 'default',
          effect: effect || 'fade-right',
          width: width ? 'width="' + width + '"' : ''
        },
        on: {
          hide: this.handleHide,
          confirm: this.handleConfirm,
          show: this.handleShow,
          closed: this.destroy
        }
      }, [])
    },
  })
}

export default {
  open
}
