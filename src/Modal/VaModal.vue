<template>
    <div :class="classObj" :style="styleObj" ref="modal">
        <div :class="`${prefixCls}-modal-dialog`" :style="{'width': width }">

            <div :class="`${prefixCls}-modal-loading`" v-if="modalIsLoading">
                <va-loading color="#888" size="md"></va-loading>
            </div>

            <div :class="`${prefixCls}-modal-content`" v-else>

                <slot name="header">
                    <div :class="`${prefixCls}-modal-header`">
                        <va-button :class="`${prefixCls}-close`" @click="close" type="subtle">
                            <va-icon type="times"></va-icon>
                        </va-button>
                        <div :class="`${prefixCls}-modal-title`">
                            <slot name="title">
                                {{title}}
                            </slot>
                        </div>
                    </div>
                </slot>

                <div :class="`${prefixCls}-modal-body`">
                    <slot name="body"/>
                </div>

                <div :class="`${prefixCls}-modal-footer`">
                    <slot name="footer">
                        <va-button @click.native="close" type="subtle">
                            {{getL('cancel')}}
                        </va-button>
                        <va-button :focused="focused" @click.native="confirm" type="primary">
                            {{getL('confirm')}}
                        </va-button>
                    </slot>
                </div>

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
        type: String,
        default: '600px',
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
    mounted() {
      const $body = document.querySelector('body')
      $body.appendChild(this.$refs.modal)
    },
    beforeDestroy() {
      const $body = document.querySelector('body')
      $body.removeChild(this.$refs.modal)
    },
    computed: {
      classObj() {
        let {prefixCls, effect} = this
        let klass = {}

        klass[prefixCls + '-modal'] = true
        klass[prefixCls + '-modal-' + effect] = true

        return klass
      },
      styleObj() {
        let {backdrop, numberOfParentModals} = this
        let style = {}

        if (!backdrop) {
          style['background'] = 'none !important'
        }

        let topMargin = parseInt(numberOfParentModals) * 10
        style['padding-top'] = topMargin + 'px'

        return style
      },
      modalIsLoading() {
        return this.loading
      }
    },
    data() {
      let show = this.show
      return {
        isShow: show,
        focused: false,
        numberOfParentModals: 0
      }
    },
    watch: {
      isShow(val) {
        /**
         * Stackable logic
         */
        if (val) {
          this.$emit('show', {type: 'show'})
          let x = document.getElementsByClassName(this.prefixCls + '-modal-in')
          this.numberOfParentModals = x.length

          /**
           * If any parent modals do exist, then let's stack them in a
           * nicely fashion, by moving each over to the left a bit.
           */
          let distanceToMove = 20
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
                let m = Math.abs(currentMarginLeft.slice(0, -2))
                let dist = parseInt(m + distanceToMove)
                x[i].style['margin-left'] = '-' + dist + 'px'
              } else {
                /**
                 * If the modal does not already have a margin-left,
                 * then we just move it over by distanceToMove.
                 */
                x[i].style['margin-left'] = (distanceToMove * -1) + 'px'
              }
            }
          }
        } else {
          this.$emit('hide', {type: 'hide'})

          let x = document.getElementsByClassName(this.prefixCls + '-modal-in')
          this.numberOfParentModals = x.length
          let distanceToMove = 20
          if (this.numberOfParentModals > 0) {
            for (let i = 0; i < this.numberOfParentModals; i++) {
              let currentMarginLeft = x[i].style['margin-left']
              if (currentMarginLeft && currentMarginLeft !== '0px') {
                let m = Math.abs(currentMarginLeft.slice(0, -2))
                let dist = parseInt(m - distanceToMove)
                x[i].style['margin-left'] = '-' + dist + 'px'
              } else {
                //
              }
            }
          }
        }

        /**
         * Classes
         */
        const el = this.$el
        const body = document.body
        const scrollBarWidth = getScrollBarWidth()
        if (val) {
          el.querySelector('.' + this.prefixCls + '-modal-content').focus()
          el.style.display = 'block'
          // this timeout is required for opacity transition
          setTimeout(() => {
            element.addClass(el, this.prefixCls + '-modal-in')
          }, 20)
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
            this.$emit('closed', {type: 'closed'})
          }, 300)
        }
      }
    },
    methods: {
      close() {
        this.isShow = false
      },
      open() {
        this.isShow = true
      },
      confirm() {
        this.$emit('confirm', {type: 'confirm'})
      }
    }
  }
</script>
