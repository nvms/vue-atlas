<template>
  <div :class="classObj" ref="notification" :style="styleObj">
    <div
      :class="`${prefixCls}-notification-dialog`"
      :style="{'width': width + 'px'}">
      <div :class="`${prefixCls}-notification-content`">
        <div :class="`${prefixCls}-notification-content-inner-${type}`">
          <div :class="`${prefixCls}-notification-content-inner-${type}-left`">
            <va-icon
              :type="notificationIconType">
            </va-icon>
          </div>
          <div :class="`${prefixCls}-notification-content-inner-${type}-right`">
            <div :class="`${prefixCls}-notification-content-inner-${type}-right-close`">
              <va-button type="subtle" @click.native="close">
                <va-icon type="times" size="14px"></va-icon>
              </va-button>
            </div>
            <div :class="`${prefixCls}-notification-content-inner-${type}-right-title`">
              {{title}}
            </div>
            <div
              :class="`${prefixCls}-notification-content-inner-${type}-right-message`"
              v-html="message">
            </div>
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
      required: false,
      note: 'The title of the notification'
    },
    message: {
      type: String,
      default: '',
      required: false,
      note: 'Notification text'
    },
    show: {
      type: Boolean,
      default: false,
      required: false,
      note: 'When false, the notification will not be shown'
    },
    width: {
      type: Number,
      default: 440,
      required: false,
      note: 'The width of the notification'
    },
    effect: {
      type: String,
      default: 'fade-right',
      required: false,
      note: 'The css effect to apply to the notification.'
    },
    type: {
      type: String,
      default: 'default',
      required: false,
      note: 'The type of notification to display'
    },
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  data () {
    let show = this.show
    return {
      isShow: show
    }
  },
  watch: {
    isShow (val) {
      /**
       * Stackable logic
       */
      if (val) {
        let x = document.getElementsByClassName(this.prefixCls + '-notification-in')
        this.numberOfParentModals = x.length
        let distanceToMove = 5
        if (this.numberOfParentModals > 0) {
          for (let i = 0; i < this.numberOfParentModals; i++) {
            let currentMarginTop = x[i].style['top']
            if (currentMarginTop && currentMarginTop !== '0px') {
              let m = Math.abs(currentMarginTop.slice(0, -2))
              let dist = parseInt(m + distanceToMove)
              x[i].style['top'] = '-' + dist + 'px'
              x[i].style['right'] = '-' + dist + 'px'
            } else {
              x[i].style['top'] = (distanceToMove * -1) + 'px'
              x[i].style['right'] = (distanceToMove * -1) + 'px'
            }
          }
        }
      } else {
        let x = document.getElementsByClassName(this.prefixCls + '-notification-in')
        this.numberOfParentModals = x.length
        let distanceToMove = 5
        if (this.numberOfParentModals > 0) {
          for (let i = 0; i < this.numberOfParentModals; i++) {
            let currentMarginTop = x[i].style['top']
            if (currentMarginTop && currentMarginTop !== '0px') {
              let m = Math.abs(currentMarginTop.slice(0, -2))
              let dist = parseInt(m - distanceToMove)
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
        el.querySelector('.' + this.prefixCls + '-notification')
        el.style.display = 'block'
        // timeout required for opacity transition
        setTimeout(() => { element.addClass(el, this.prefixCls + '-notification-in') }, 20)
        element.addClass(body, this.prefixCls + '-notification-open')
      } else {
        this.$emit('hide', { type: 'hide' })
        element.removeClass(el, this.prefixCls + '-notification-in')
        element.addClass(el, this.prefixCls + '-notification-out')
        setTimeout(() => {
          el.style.display = 'none'
          element.removeClass(body, this.prefixCls + '-notification-open')
          element.removeClass(el, this.prefixCls + '-notification-out')
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
  },
  computed: {
    classObj () {
      let {prefixCls, effect, type} = this
      let klass = {}

      klass[prefixCls + '-notification'] = true
      klass[prefixCls + '-notification-' + type] = true
      klass[prefixCls + '-notification-' + effect] = true

      return klass
    },
    styleObj () {
      return {}
    },
    notificationIconType () {
      let {type} = this

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
    }
  }
}
</script>
