import Vue from 'vue'
import VaModal from './VaModal.vue'
import localeMixin from '../Mixin/localeMixin'

const $body = document.querySelector('body')

const createNode = () => {
  const $node = document.createElement('div')
  $body.appendChild($node)
  return $node
}

// const removeNode = $node => {
//   $body.removeChild($node)
// }

const typeMap = {
  success: {
    name: 'check',
    color: '#57D9A3'
  },
  danger: {
    name: 'exclamation-triangle',
    color: '#CD4425'
  },
  warning: {
    name: 'exclamation-triangle',
    color: '#F29D41'
  },
  info: {
    name: 'info',
    color: '#4C9AFF'
  }
}

const confirm = (options) => {
  const {title, message, effect, type, prefixCls, width, onConfirm, onHide, onShow} = options
  new Vue({
    el: createNode(),
    data () {
      return {
        show: false,
        pc: 'va'
      }
    },
    components: {
      VaModal
    },
    template: `<VaModal ref="modal" title="${title}"
      effect="${effect || 'fade-up'}"
      ${width ? 'width="' + width + '"' : ''}
      :backdrop-clickable="false"
      @confirm="handleConfirm"
      @hide="handleHide"
      @show="handleShow"
      @closed="destroy">
      <div slot="header" :class="headerCls">
        <va-button type="subtle" :class="btnCls" @click.native="handleClose">
          <va-icon type="times" style="solid"></va-icon>
        </va-button>
        <div :class="titleCls" v-if="!${!title}"> <!-- lol.. this means.. if has title -->
          <va-icon :style="{color:iconType.color}" :type="iconType.name" margin="0 10px 0 0"></va-icon>
          <span v-if="!${!title}">${title}</span>
        </div>
      </div>
      <div slot="body">
        ${message}
      </div>
    </VaModal>`,
    mounted () {
      if (prefixCls) {
        this.pc = prefixCls
      }
      this.$nextTick(() => {
        this.$refs.modal.open()
      })
    },
    destroyed () {
      // removeNode(this.$el)
    },
    computed: {
      iconType () {
        return typeMap[type]
      },
      headerCls () {
        return this.pc + '-modal-header'
      },
      btnCls () {
        return this.pc + '-close'
      },
      titleCls () {
        return this.pc + '-modal-title'
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
    }
  })
}

const alert = (options) => {
  const {title, message, effect, type, prefixCls, width, onConfirm, onHide, onShow} = options
  new Vue({
    el: createNode(),
    mixins: [localeMixin('VaModal')],
    data () {
      return {
        show: false,
        pc: 'va'
      }
    },
    components: {
      VaModal
    },
    template: `<VaModal title="${title}"
      effect="${effect || 'fade-up'}"
      ref="modal"
      ${width ? 'width="' + width + '"' : ''}
      :backdrop-clickable="false"
      @hide="handleHide"
      @show="handleShow"
      @closed="destroy">
      <div slot="header" :class="headerCls">
        <va-button type="subtle" :class="btnCls" @click.native="handleClose">
          <va-icon type="times" style="solid"></va-icon>
        </va-button>
        <div :class="titleCls" v-if="!${!title}"> <!-- TODO: there has to be a better way -->
          <va-icon :style="{color:iconType.color}" :type="iconType.name" margin="0 10px 0 0"></va-icon>
          <span v-if="!${!title}">${title}</span>
        </div>
      </div>
      <div slot="body">
        ${message}
      </div>
      <div slot="footer" class="va-modal-footer">
        <va-button @click.native="handleConfirm">{{getL('confirm')}}</va-button>
      </div>
    </VaModal>`,
    mounted () {
      if (prefixCls) {
        this.pc = prefixCls
      }
      this.$nextTick(() => {
        this.$refs.modal.open()
      })
    },
    destroyed () {
      // removeNode(this.$el)
    },
    computed: {
      iconType () {
        return typeMap[type]
      },
      headerCls () {
        return this.pc + '-modal-header'
      },
      btnCls () {
        return this.pc + '-close'
      },
      titleCls () {
        return this.pc + '-modal-title'
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
      handleHide () {
        onHide && onHide()
      },
      handleClose () {
        this.$refs.modal.close()
      },
      destroy () {
        this.$destroy()
      }
    }
  })
}

export default {
  alert,
  confirm
}
