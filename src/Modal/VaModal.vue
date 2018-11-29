<template>
  <div :class="classObj" ref="modal" :style="styleObj">
    <div :class="`${prefixCls}-modal-dialog`" :style="{'width': width + 'px'}">

      <div v-if="modalIsLoading" :class="`${prefixCls}-modal-loading`">
        <va-loading size="md" color="#888"></va-loading>
      </div>

      <div v-else :class="`${prefixCls}-modal-content`">

        <slot name="header">
          <div :class="`${prefixCls}-modal-header`">
            <va-button type="subtle" :class="`${prefixCls}-close`" @click.native="close">
              <va-icon type="times" style="solid"></va-icon>
            </va-button>
            <div :class="`${prefixCls}-modal-title`">{{title}}</div>
          </div>
        </slot>

        <div :class="`${prefixCls}-modal-body`">
          <slot name="body" />
        </div>

        <slot name="footer">
          <div :class="`${prefixCls}-modal-footer`">
            <va-button type="subtle" @click.native="close">{{getL('cancel')}}</va-button>
            <va-button type="primary" @click.native="confirm" :focused="focused">{{getL('confirm')}}</va-button>
          </div>
        </slot>

      </div>
    </div>
  </div>
</template>

<script>
import getScrollBarWidth from '../utils/getScrollBarWidth'
import EventListener from '../utils/EventListener'
import VaButton from '../Button/VaButton'
import element from '../utils/element'
import localeMixin from '../Mixin/localeMixin'

export default {
  name: 'VaModal',
  mixins: [localeMixin('VaModal')],
  props: {
    title: {
      type: String,
      default: '',
      required: false,
      note: 'The title of the modal'
    },
    show: {
      type: Boolean,
      default: false,
      required: false,
      note: 'When false, the modal will not be shown'
    },
    width: {
      type: Number,
      default: 600,
      required: false,
      note: 'The width of the modal.'
    },
    effect: {
      type: String,
      default: 'fade-up',
      required: false,
      note: 'The css effect to apply to the modal. See _modal.scss'
    },
    loading: {
      type: Boolean,
      default: false,
      note: 'When true, modal shows its loading state/'
    },
    backdrop: {
      type: Boolean,
      default: true,
      required: false
    },
    backdropClickable: {
      type: Boolean,
      default: true,
      required: false,
      note: 'When true, clicking the backdrop in a standard or custom modal will close the modal. This prop has no effect on alert or confirm modals.'
    },
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  components: {
    VaButton
  },
  mounted () {
    const $body = document.querySelector('body')
    $body.appendChild(this.$refs.modal)
  },
  beforeDestroy () {
    const $body = document.querySelector('body')
    $body.removeChild(this.$refs.modal)
  },
  computed: {
    classObj () {
      let {prefixCls, effect} = this
      let klass = {}

      klass[prefixCls + '-modal'] = true
      klass[prefixCls + '-modal-' + effect] = true

      return klass
    },
    styleObj () {
      let {backdrop, numberOfParentModals} = this
      let style = {}

      if (!backdrop) {
        style['background'] = 'none !important'
      }

      let topMargin = parseInt(numberOfParentModals) * 20
      style['padding-top'] = topMargin + 'px'

      return style
    },
    modalIsLoading () {
      return this.loading
    }
  },
  data () {
    let show = this.show
    return {
      isShow: show,
      focused: false,
      numberOfParentModals: 0
    }
  },
  watch: {
    isShow (val) {
      if (val) {
        this.$emit('show', { type: 'show' })

        let x = document.getElementsByClassName(this.prefixCls + '-modal-in')
        this.numberOfParentModals = x.length

        /**
         * If any parent modals do exist, then let's stack them in a
         * nicely fashion, by moving each over to the left a bit.
         */
        let distanceToMove = 30
        if (this.numberOfParentModals > 0) {
          for (let i = 0; i < this.numberOfParentModals; i++) {
            let currentMarginLeft = x[i].style['margin-left']
            if (currentMarginLeft && currentMarginLeft !== '0px') {
              /**
               * If this modal already has a margin-left applied,
               * then we must have hit it already. If that's the case,
               * then we simply double the value by whatever it
               * already is.
               */
              // Slice 'px' off from the end.
              let m = currentMarginLeft.slice(0, -2)
              x[i].style['margin-left'] = (m * 2) + 'px'
            } else {
              /**
               * If the modal does not already have a margin-left,
               * then we just move it over by whatever value looks nice.
               * 30 looks nice.
               */
              x[i].style['margin-left'] = (distanceToMove * -1) + 'px'
              // x[i].style['opacity'] = '0%'
            }
          }
        }
      } else {
        this.$emit('hide', { type: 'hide' })

        let x = document.getElementsByClassName(this.prefixCls + '-modal-in')
        this.numberOfParentModals = x.length
        let distanceToMove = 30
        if (this.numberOfParentModals > 0) {
          for (let i = 0; i < this.numberOfParentModals; i++) {
            let currentMarginLeft = x[i].style['margin-left']
            if (currentMarginLeft && currentMarginLeft !== '0px') {
              let m = currentMarginLeft.slice(0, -2)
              x[i].style['margin-left'] = (m - distanceToMove * -1) + 'px'
            } else {
              //
            }
          }
        }
      }

      const el = this.$el
      const body = document.body
      const scrollBarWidth = getScrollBarWidth()
      if (val) {
        el.querySelector('.' + this.prefixCls + '-modal-content').focus()
        el.style.display = 'block'
        // this timeout is required for opacity transition
        setTimeout(() => { element.addClass(el, this.prefixCls + '-modal-in') }, 20)
        element.addClass(body, this.prefixCls + '-modal-open')
        if (!scrollBarWidth) {
          element.addClass(body, this.prefixCls + '-modal-hide-y')
        }
        if (this.backdropClickable) {
          this._blurModalContentEvent = EventListener.listen(this.$el, 'click', (e) => {
            if (e.target === el) this.isShow = false
          })
        }
      } else {
        if (this._blurModalContentEvent) this._blurModalContentEvent.remove()
        element.removeClass(el, this.prefixCls + '-modal-in')
        element.addClass(el, this.prefixCls + '-modal-out')
        setTimeout(() => {
          el.style.display = 'none'
          element.removeClass(body, this.prefixCls + '-modal-open')
          element.removeClass(body, this.prefixCls + '-modal-hide-y')
          element.removeClass(el, this.prefixCls + '-modal-out')
          body.style.paddingRight = '0'
          this.$emit('closed', { type: 'closed' })
        }, 300)
      }
    }
  },
  methods: {
    close () {
      this.isShow = false
    },
    open () {
      this.isShow = true
    },
    confirm () {
      this.$emit('confirm', { type: 'confirm' })
    }
  }
}
</script>
