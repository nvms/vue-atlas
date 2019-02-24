import Vue from 'vue'
import VaButton from '../Button/VaButton'
import VaIcon from '../Icon/VaIcon'
import VaModal from './VaModal.vue'
import localeMixin from '../Mixin/localeMixin'

const $body = document.querySelector('body')

const createNode = () => {
  const $node = document.createElement('div')
  $body.appendChild($node)
  return $node
}

const typeMap = {
  success: {
    name: 'check',
    color: '#57D9A3'
  },
  info: {
    name: 'info',
    color: '#4C9AFF'
  },
  warning: {
    name: 'exclamation-triangle',
    color: '#F29D41'
  },
  danger: {
    name: 'exclamation-triangle',
    color: '#CD4425'
  }
}

const buttonTypeMap = {
  success: {
    appearance: 'primary'
  },
  info: {
    appearance: 'primary'
  },
  warning: {
    appearance: 'warning'
  },
  danger: {
    appearance: 'danger'
  }
}

const confirm = (options) => {
  const { title, message, effect, type, width, onConfirm, onHide, onShow, backdropClickable } = options
  /* eslint-disable no-new */
  new Vue({
    el: createNode(),
    mixins: [localeMixin('VaModal')],
    mounted () {
      this.$refs.modal.open()
    },
    computed: {
      iconType () {
        return typeMap[type || 'info']
      },
      buttonType () {
        return buttonTypeMap[type || 'primary']
      }
    },
    methods: {
      handleShow () {
        onShow && onShow()
      },
      handleConfirm () {
        onConfirm && onConfirm()
        this.$refs.modal.close()
      },
      handleClose () {
        this.$refs.modal.close()
      },
      handleHide () {
        onHide && onHide()
      },
      destroy () {
        this.$destroy()
      }
    },
    render (createElement) {
      let iconElement = createElement(VaIcon, {
        props: {
          type: this.iconType.name,
          margin: '0 10px 0 0'
        },
        style: {
          color: this.iconType.color
        }
      }, [])
      let titleElement = ''
      if (title) {
        titleElement = createElement('div', { slot: 'title' }, [
          iconElement,
          title
        ])
      }
      let bodyElement = createElement('div', { slot: 'body', domProps: { innerHTML: message } })

      let footerElement = createElement(VaButton, {
        slot: 'footer',
        props: {
          type: this.buttonType.appearance
        },
        on: {
          click: this.handleConfirm
        }
      }, [this.getL('confirm')])

      return createElement(VaModal, {
        ref: 'modal',
        props: {
          title: title,
          effect: effect || 'fade-up',
          width: width || '600px',
          backdropClickable: backdropClickable || false
        },
        on: {
          confirm: this.handleConfirm,
          hide: this.handleHide,
          show: this.handleShow,
          closed: this.destroy
        }
      }, [
        titleElement,
        bodyElement,
        footerElement
      ])
    }
  })
}

const alert = (options) => {
  const { title, message, effect, type, width, onConfirm, onHide, onShow, backdropClickable } = options
  /* eslint-disable no-new */
  new Vue({
    el: createNode(),
    mixins: [localeMixin('VaModal')],
    mounted () {
      this.$refs.modal.open()
    },
    computed: {
      iconType () {
        return typeMap[type || 'info']
      },
      buttonType () {
        return buttonTypeMap[type || 'primary']
      }
    },
    methods: {
      handleShow () {
        onShow && onShow()
      },
      handleConfirm () {
        onConfirm && onConfirm()
        this.$refs.modal.close()
      },
      handleClose () {
        this.$refs.modal.close()
      },
      handleHide () {
        onHide && onHide()
      },
      destroy () {
        this.$destroy()
      }
    },
    render (createElement) {
      let iconElement = createElement(VaIcon, {
        props: {
          type: this.iconType.name,
          margin: '0 10px 0 0'
        },
        style: {
          color: this.iconType.color
        }
      }, [])

      let titleElement = ''
      if (title) {
        titleElement = createElement('div', { slot: 'title' }, [
          iconElement,
          title
        ])
      }

      let bodyElement = createElement('div', { slot: 'body', domProps: { innerHTML: message } })

      let footerElement = createElement(VaButton, {
        slot: 'footer',
        props: {
          type: this.buttonType.appearance
        },
        on: {
          click: this.handleConfirm
        }
      }, [this.getL('confirm')])

      return createElement(VaModal, {
        ref: 'modal',
        props: {
          title: title,
          effect: effect || 'fade-up',
          width: width || '600px',
          backdropClickable: backdropClickable || false
        },
        on: {
          confirm: this.handleConfirm,
          hide: this.handleHide,
          show: this.handleShow,
          closed: this.destroy
        }
      }, [
        titleElement,
        bodyElement,
        footerElement
      ])
    }
  })
}

export default {
  alert,
  confirm
}
