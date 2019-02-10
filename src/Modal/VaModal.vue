<template>
    <div :class="classObj" :style="styleObj" ref="modal">
        <div :class="`${classPrefix}-modal-dialog`" :style="{'width': width }">
            <div :class="`${classPrefix}-modal-loading`" v-if="modalIsLoading">
                <va-loading color="#888" size="md"></va-loading>
            </div>

            <div :class="`${classPrefix}-modal-content`" v-else>

                <slot name="header">
                    <div :class="`${classPrefix}-modal-header`">
                        <va-button tabindex="-1" :class="`${classPrefix}-close`" @click="close" type="subtle">
                            <va-icon type="times"></va-icon>
                        </va-button>
                        <div :class="`${classPrefix}-modal-title`">
                            <slot name="title">
                                {{title}}
                            </slot>
                        </div>
                    </div>
                </slot>

                <div :class="`${classPrefix}-modal-body`">
                    <slot name="body"/>
                </div>

                <div :class="`${classPrefix}-modal-footer`">
                    <slot name="footer">
                        <va-button :focused="focused" @click.native="confirm" type="primary">
                            {{getL('confirm')}}
                        </va-button>
                        <va-button @click.native="close" type="subtle">
                            {{getL('cancel')}}
                        </va-button>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import createFocusTrap from 'focus-trap'
  import getScrollBarWidth from '../utils/getScrollBarWidth'
  import EventListener from '../utils/EventListener'
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
      classPrefix: {
        type: String,
        default: 'va'
      }
    },
    data() {
      let show = this.show
      return {
        isShow: show,
        focused: false,
        numberOfParentModals: 0,
        focusTrap: null
      }
    },
    computed: {
      classObj() {
        let {classPrefix, effect} = this
        let classes = {}

        classes[classPrefix + '-modal'] = true
        classes[classPrefix + '-modal-' + effect] = true

        return classes
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
    created() {
      const escapeHandler = e => {
        if (e.key === 'Escape' && this.isTop()) {
          this.close()
        }
      }
      document.addEventListener('keydown', escapeHandler)
      this.$once('hook:destroyed', () => {
        document.removeEventListener('keydown', escapeHandler)
      })
    },
    mounted() {
      this.focusTrap = createFocusTrap(this.$refs.modal, {
        clickOutsideDeactivates: true,
        returnFocusOnDeactivate: true,
        fallbackFocus: this.$refs.modal
      })

      document.querySelector('body').appendChild(this.$refs.modal)
      this.$once('hook:beforeDestroy', () => {
        document.querySelector('body').removeChild(this.$refs.modal)
      })
    },
    watch: {
      isShow(val) {
        /**
         * Stackable logic
         */
        if (val) {
          this.$emit('show', {type: 'show'})
          let x = document.getElementsByClassName(this.classPrefix + '-modal-in')
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

          let x = document.getElementsByClassName(this.classPrefix + '-modal-in')
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
          el.querySelector('.' + this.classPrefix + '-modal-content').focus()
          el.style.display = 'block'
          // this timeout is required for opacity transition
          setTimeout(() => {
            element.addClass(el, this.classPrefix + '-modal-in')
          }, 20)
          element.addClass(body, this.classPrefix + '-modal-open')
          if (!scrollBarWidth) {
            element.addClass(body, this.classPrefix + '-modal-hide-y')
          }
          if (this.backdropClickable) {
            this._blurModalContentEvent = EventListener.listen(this.$el, 'click', (e) => {
              if (e.target === el) this.isShow = false
            })
          }

          this.focusTrap.activate()
        } else {
          if (this._blurModalContentEvent) this._blurModalContentEvent.remove()
          element.removeClass(el, this.classPrefix + '-modal-in')
          element.addClass(el, this.classPrefix + '-modal-out')
          setTimeout(() => {
            el.style.display = 'none'
            element.removeClass(body, this.classPrefix + '-modal-open')
            element.removeClass(body, this.classPrefix + '-modal-hide-y')
            element.removeClass(el, this.classPrefix + '-modal-out')
            body.style.paddingRight = '0'
            this.$emit('closed', {type: 'closed'})
          }, 300)

          this.focusTrap.deactivate()
        }
      }
    },
    methods: {
      isTop() {
        return this.isShow && (!this.$refs.modal.style['margin-left'] || this.$refs.modal.style['margin-left'] === '0px')
      },
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
