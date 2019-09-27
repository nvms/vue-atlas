<template>
  <div :class="classObj" :style="styleObj" ref="modal">
    <div :class="`va-modal-dialog`" :style="{'width': width }">
      <va-collapse-transition>
        <div :class="`va-modal-loading`" v-show="modalIsLoading">
          <va-loading color="#888" size="md"/>
        </div>
      </va-collapse-transition>

      <div :class="`va-modal-content`" v-show="!modalIsLoading">
        <slot name="header">
          <div :class="`va-modal-header`">
            <va-button
              tabindex="-1"
              :class="`va-close`"
              @click="close"
              type="subtle"
            >
              <va-icon type="times"/>
            </va-button>
            <div :class="`va-modal-title`">
              <slot name="title">{{title}}</slot>
            </div>
          </div>
        </slot>
        <div :class="`va-modal-body`">
          <slot name="body"/>
        </div>
        <div :class="`va-modal-footer`">
          <slot name="footer">
            <va-button
              :focused="focused"
              @click.native="confirm"
              type="primary"
            >{{getL('confirm')}}</va-button>
            <va-button @click.native="close" type="subtle">{{getL('cancel')}}</va-button>
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
      required: false
    },
    show: {
      type: Boolean,
      default: false,
      required: false
    },
    width: {
      type: String,
      default: '600px',
      required: false
    },
    effect: {
      type: String,
      default: 'fade-up',
      required: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    backdrop: {
      type: Boolean,
      default: true,
      required: false
    },
    backdropClickable: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  data () {
    let show = this.show
    return {
      isShow: show,
      focused: false,
      numberOfParentModals: 0,
      focusTrap: null
    }
  },
  computed: {
    classObj () {
      let { effect } = this
      let classes = {}

      classes['va-modal'] = true
      classes['va-modal-' + effect] = true

      return classes
    },
    styleObj () {
      let { backdrop, numberOfParentModals } = this
      let style = {}

      if (!backdrop) {
        style['background'] = 'none !important'
      }

      let topMargin = parseInt(numberOfParentModals) * 10
      style['padding-top'] = topMargin + 'px'

      return style
    },
    modalIsLoading () {
      return this.loading
    }
  },
  created () {
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
  mounted () {
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
    modalIsLoading (val) {
      if (!val) {
        setTimeout(() => {
          this.focusTrap.activate()
        }, 50)
      }
    },
    isShow (val) {
      /**
       * Stackable logic
       */
      if (val) {
        this.$emit('show', { type: 'show' })
        let x = document.getElementsByClassName('va-modal-in')
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
              x[i].style['margin-left'] = distanceToMove * -1 + 'px'
            }
          }
        }
      } else {
        this.$emit('hide', { type: 'hide' })

        let x = document.getElementsByClassName('va-modal-in')
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
        if (!this.modalIsLoading) {
          el.querySelector('.' + 'va-modal-content').focus()
        }
        el.style.display = 'block'
        // this timeout is required for opacity transition
        setTimeout(() => {
          element.addClass(el, 'va-modal-in')
        }, 20)
        element.addClass(body, 'va-modal-open')
        if (!scrollBarWidth) {
          element.addClass(body, 'va-modal-hide-y')
        }
        if (this.backdropClickable) {
          this._blurModalContentEvent = EventListener.listen(
            this.$el,
            'click',
            e => {
              if (e.target === el) this.isShow = false
            }
          )
        }

        if (!this.modalIsLoading) {
          this.focusTrap.activate()
        }
      } else {
        if (this._blurModalContentEvent) this._blurModalContentEvent.remove()
        element.removeClass(el, 'va-modal-in')
        element.addClass(el, 'va-modal-out')
        setTimeout(() => {
          el.style.display = 'none'
          element.removeClass(body, 'va-modal-open')
          element.removeClass(body, 'va-modal-hide-y')
          element.removeClass(el, 'va-modal-out')
          body.style.paddingRight = '0'
          this.$emit('closed', { type: 'closed' })
        }, 300)

        this.focusTrap.deactivate()
      }
    }
  },
  methods: {
    isTop () {
      return (
        this.isShow &&
        (!this.$refs.modal.style['margin-left'] ||
          this.$refs.modal.style['margin-left'] === '0px')
      )
    },
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

<style lang="scss">
@mixin modal-theme-mixin(
  $modalInBackground,
  $modalContentBackground,
  $modalContentColor,
  $modalLoadingBackground,
  $modalTitleColor,
  $modalBoxShadow
) {
  .va-modal-dialog {
    box-shadow: $modalBoxShadow;
  }

  &.va-modal-in {
    background: $modalInBackground;
  }

  .va-modal-content {
    background-color: $modalContentBackground;
    color: $modalContentColor;
  }

  .va-modal-loading {
    background-color: $modalLoadingBackground;
  }

  .va-modal-title {
    color: $modalTitleColor;
  }
}

.va-modal,
.va--theme-light.va-modal {
  @include modal-theme-mixin(
    $modalInBackground: rgba(9, 30, 66, 0.55),
    $modalContentBackground: $N0,
    $modalContentColor: inherit,
    $modalLoadingBackground: $N0,
    $modalTitleColor: $N900,
    $modalBoxShadow: (
      rgba(9, 30, 66, 0.2) 0px 0px 0px 1px,
      rgba(9, 30, 66, 0.08) 0px 2px 1px,
      rgba(9, 30, 66, 0.51) 0px 0px 20px -6px
    )
  );
}

.va-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2100;
  display: none;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  outline: 0;
  transition: all 0.3s ease;

  &-open {
    overflow-x: hidden;
  }

  &-hide-y {
    overflow-y: hidden;
  }

  &-dialog {
    position: relative;
    width: auto;
    margin: 80px auto 80px auto;
    border-radius: 3px;
    max-width: 90%;
  }

  &-content {
    position: relative;
    background-clip: padding-box;
    border-radius: 3px;
    outline: 0;
    box-shadow: none;
    border: none;
    padding: 15px;
  }

  &-loading {
    position: relative;
    border-radius: 3px;
    outline: 0;
    box-shadow: none;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 0;

    .va-page-loading-con {
      display: table;
      margin: 0 auto;
    }
  }

  &-header {
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
  }

  &-title {
    margin: 0;
    line-height: 1.7;
    font-weight: 500;
    font-size: 20px;
    display: flex;
    align-items: center;

    .va-fa {
      font-size: 14px;
      margin-right: 10px;
    }
  }

  &-body {
    padding: 15px 0;
  }

  &-footer {
    text-align: right;

    .va-btn {
      margin-left: 5px;
    }
  }

  /*fade*
  &-fade &-dialog {
    opacity: 0;
    transition: opacity 0.3s;
  }
  /*expands to class="va-modal-fade va-modal-in" and references a child va-modal-dialog selector*/
  &-fade#{&}-in &-dialog {
    opacity: 1 !important;
  }

  /*fade-up*/
  &-fade-up &-dialog {
    opacity: 0;
    transform: translateY(20px);
    transition: transform 0.3s, opacity 0.3s;
  }

  &-fade-up#{&}-in &-dialog {
    opacity: 1;
    transform: translateY(0);
    // box-shadow: rgba(9, 30, 66, .2) 0px 0px 0px 1px, rgba(9, 30, 66, 0.08) 0px 2px 1px, rgba(9, 30, 66, 0.51) 0px 0px 20px -6px;
  }

  &-fade-up#{&}-out &-dialog {
    opacity: 0;
    transform: translateY(-20px);
  }
}
</style>
