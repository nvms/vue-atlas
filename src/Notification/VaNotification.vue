<template>
  <div :class="classObj" :style="styleObj" ref="notification" v-if="alive">
    <div
      class="va-notification-dialog"
      :style="{'width': width }"
    >
      <div class="va-notification-content">
        <div :class="`va-notification-content-inner-${type}`">
          <div
            :class="`va-notification-content-inner-${type}-left`"
          >
            <va-icon :type="notificationIconType"/>
          </div>
          <div
            :class="`va-notification-content-inner-${type}-right`"
          >
            <div
              :class="`va-notification-content-inner-${type}-right-close`"
            >
              <va-button @click="close" type="subtle" size="sm">
                <va-icon size="14px" type="times"/>
              </va-button>
            </div>
            <div
              :class="`va-notification-content-inner-${type}-right-title`"
            >{{title}}</div>
            <div
              :class="`va-notification-content-inner-${type}-right-message`"
              v-html="message"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import element from '../utils/element'

export default {
  name: 'VaNotification',
  props: {
    title: {
      type: String,
      default: '',
      required: false
    },
    message: {
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
      default: '440px',
      required: false
    },
    effect: {
      type: String,
      default: 'fade-right',
      required: false
    },
    type: {
      type: String,
      default: 'default',
      required: false
    },
    duration: {
      type: Number,
      default: 0,
      required: false
    }
  },
  data () {
    const show = this.show
    return {
      isShow: show,
      alive: true
    }
  },
  mounted () {
    if (this.duration) {
      setTimeout(() => {
        this.close()
      }, this.duration)
    }
  },
  watch: {
    isShow (val) {
      /**
       * Stackable logic
       */
      if (val) {
        const x = document.getElementsByClassName(
          'va-notification-in'
        )
        this.numberOfParentModals = x.length
        const distanceToMove = 5
        if (this.numberOfParentModals > 0) {
          for (let i = 0; i < this.numberOfParentModals; i++) {
            const currentMarginTop = x[i].style['top']
            if (currentMarginTop && currentMarginTop !== '0px') {
              const m = Math.abs(currentMarginTop.slice(0, -2))
              const dist = parseInt(m + distanceToMove)
              x[i].style['top'] = '-' + dist + 'px'
              x[i].style['right'] = '-' + dist + 'px'
            } else {
              x[i].style['top'] = distanceToMove * -1 + 'px'
              x[i].style['right'] = distanceToMove * -1 + 'px'
            }
          }
        }
      } else {
        const x = document.getElementsByClassName(
          'va-notification-in'
        )
        this.numberOfParentModals = x.length
        const distanceToMove = 5
        if (this.numberOfParentModals > 0) {
          for (let i = 0; i < this.numberOfParentModals; i++) {
            const currentMarginTop = x[i].style['top']
            if (currentMarginTop && currentMarginTop !== '0px') {
              const m = Math.abs(currentMarginTop.slice(0, -2))
              const dist = parseInt(m - distanceToMove)
              x[i].style['top'] = '-' + dist + 'px'
              x[i].style['right'] = '-' + dist + 'px'
            }
          }
        }
      }

      /**
       * Classes
       */
      const el = this.$el
      const body = document.body
      if (val) {
        this.$emit('show', { type: 'show' })
        el.querySelector('.' + 'va-notification')
        el.style.display = 'block'
        // timeout required for opacity transition
        setTimeout(() => {
          element.addClass(el, 'va-notification-in')
        }, 20)
        element.addClass(body, 'va-notification-open')
      } else {
        this.$emit('hide', { type: 'hide' })
        element.removeClass(el, 'va-notification-in')
        element.addClass(el, 'va-notification-out')
        setTimeout(() => {
          el.style.display = 'none'
          element.removeClass(body, 'va-notification-open')
          element.removeClass(el, 'va-notification-out')
          this.$emit('closed', { type: 'closed' })
        }, 300)
      }
    }
  },
  methods: {
    close () {
      this.isShow = false
      setTimeout(() => {
        this.alive = false
      }, 500)
    },
    open () {
      this.isShow = true
    },
    confirm () {
      this.$emit('confirm', { type: 'confirm' })
    }
  },
  computed: {
    classObj () {
      const { effect, type } = this
      const classes = {}

      classes['va-notification'] = true
      classes['va-notification-' + type] = true
      classes['va-notification-' + effect] = true

      return classes
    },
    styleObj () {
      return {}
    },
    notificationIconType () {
      const { type } = this

      switch (type) {
        case 'default':
          return 'home'
        case 'warning':
          return 'exclamation-triangle'
        case 'danger':
          return 'exclamation-triangle'
        case 'success':
          return 'thumbs-up'
        case 'info':
          return 'info-circle'
      }

      return 'info-circle'
    }
  }
}
</script>

<style lang="scss" src="../style/_reset.scss" scoped></style>
<style lang="scss">
@import "../variables";

.va-notification {
  position: fixed;
  top: 0px;
  right: 0px;
  z-index: 2000;
  display: none;
  overflow: auto;
  outline: 0;
  transition: all 0.15s ease;

  &-dialog {
    position: relative;
    width: auto;
    margin: 25px;
  }

  &-content {
    position: relative;
    background-color: $N0;
    background-clip: padding-box;
    outline: 0;
    box-shadow: none;
    border: none;
  }

  /**
   * Expands to va-notification-fade va-notification-in
   */
  &-fade#{&}-in {
    opacity: 1 !important;
  }

  /**
   * fade-right
   */
  &-fade-right &-content {
    opacity: 0;
    transform: translateX(20px);
    transition: transform 0.15s, opacity 0.15s;
  }

  &-fade-right#{&}-in &-content {
    opacity: 1;
    transform: translateX(0);
    box-shadow: rgba(9, 30, 66, 0.08) 0px 1px 2px 0px,
      rgba(9, 30, 66, 0.08) 0px 2px 4px, rgba(9, 30, 66, 0.31) 0px 3px 20px -5px;
  }

  &-fade-right#{&}-out &-content {
    opacity: 0;
    transform: translateX(20px);
  }

  @mixin notification-content-inner-mixin($type, $borderColor, $iconColor) {
    .va-notification-content-inner-#{$type} {
      display: flex;
      flex-direction: row;
      &-left {
        flex-basis: 40px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        text-align: center;
        border-left: 2px solid $borderColor;
        i {
          color: $iconColor;
        }
      }
      &-right {
        flex: 1;
        padding: 20px;
        &-close {
          position: absolute;
          top: 13px;
          right: 13px;
        }
        &-title {
          font-weight: bold;
          max-width: 90%;
        }
        &-message {
          margin-top: 5px;
        }
      }
    }
  }

  @mixin notification-content-mixin(
    $type,
    $borderSize,
    $borderColor,
    $iconColor
  ) {
    .va-notification-content {
      border-top: $borderSize solid $borderColor;
      border-right: $borderSize solid $borderColor;
      border-bottom: $borderSize solid $borderColor;
    }
    @include notification-content-inner-mixin($type, $borderColor, $iconColor);
  }

  &-warning {
    @include notification-content-mixin('warning', 2px, $Y200, $Y500);
  }

  &-danger {
    @include notification-content-mixin('danger', 2px, $R300, $R300);
  }

  &-success {
    @include notification-content-mixin('success', 2px, $G200, $G400);
  }

  &-info {
    @include notification-content-mixin('info', 2px, $B100, $B400);
  }
}
</style>
