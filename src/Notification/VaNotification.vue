<template>
    <div :class="classObj" :style="styleObj" ref="notification" v-if="alive">
        <div :class="`${classPrefix}-notification-dialog`"
             :style="{'width': width }">
            <div :class="`${classPrefix}-notification-content`">
                <div :class="`${classPrefix}-notification-content-inner-${type}`">
                    <div :class="`${classPrefix}-notification-content-inner-${type}-left`">
                        <va-icon :type="notificationIconType"></va-icon>
                    </div>
                    <div :class="`${classPrefix}-notification-content-inner-${type}-right`">
                        <div :class="`${classPrefix}-notification-content-inner-${type}-right-close`">
                            <va-button @click="close" type="subtle">
                                <va-icon size="14px" type="times"></va-icon>
                            </va-button>
                        </div>
                        <div :class="`${classPrefix}-notification-content-inner-${type}-right-title`">
                            {{title}}
                        </div>
                        <div :class="`${classPrefix}-notification-content-inner-${type}-right-message`"
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
        type: String,
        default: '440px',
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
      duration: {
        type: Number,
        default: 0,
        required: false,
        note: 'Notification TTL'
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
        alive: true
      }
    },
    mounted() {
      if (this.duration) {
        setTimeout(() => {
          this.close()
        }, this.duration)
      }
    },
    watch: {
      isShow(val) {
        /**
         * Stackable logic
         */
        if (val) {
          let x = document.getElementsByClassName(this.classPrefix + '-notification-in')
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
          let x = document.getElementsByClassName(this.classPrefix + '-notification-in')
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
          this.$emit('show', {type: 'show'})
          el.querySelector('.' + this.classPrefix + '-notification')
          el.style.display = 'block'
          // timeout required for opacity transition
          setTimeout(() => {
            element.addClass(el, this.classPrefix + '-notification-in')
          }, 20)
          element.addClass(body, this.classPrefix + '-notification-open')
        } else {
          this.$emit('hide', {type: 'hide'})
          element.removeClass(el, this.classPrefix + '-notification-in')
          element.addClass(el, this.classPrefix + '-notification-out')
          setTimeout(() => {
            el.style.display = 'none'
            element.removeClass(body, this.classPrefix + '-notification-open')
            element.removeClass(el, this.classPrefix + '-notification-out')
            this.$emit('closed', {type: 'closed'})
          }, 300)
        }

      }
    },
    methods: {
      close() {
        this.isShow = false
        setTimeout(() => {
          this.alive = false
        }, 500)
      },
      open() {
        this.isShow = true
      },
      confirm() {
        this.$emit('confirm', {type: 'confirm'})
      }
    },
    computed: {
      classObj() {
        let {classPrefix, effect, type} = this
        let classes = {}

        classes[classPrefix + '-notification'] = true
        classes[classPrefix + '-notification-' + type] = true
        classes[classPrefix + '-notification-' + effect] = true

        return classes
      },
      styleObj() {
        return {}
      },
      notificationIconType() {
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
