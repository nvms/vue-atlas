const PopoverMixin = {
  props: {
    trigger: {
      type: String,
      default: 'hover'
    },
    effect: {
      type: String,
      default: 'fadeDown'
    },
    title: {
      type: String
    },
    content: {
      type: String
    },
    header: {
      type: Boolean,
      default: true
    },
    placement: {
      type: String,
      default: 'top'
    },
    noresize: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: false
    },
    onClick: {
      type: Function
    }
  },
  data () {
    const show = this.show
    return {
      isShow: show,
      listeners: this.getListeners(),
      position: {
        top: 0,
        left: 0
      }
    }
  },
  watch: {
    isShow (val) {
      if (val && !this.noresize) {
        this.$nextTick(() => {
          this.resize()
        })
      }
    }
  },
  methods: {
    getListeners () {
      switch (this.trigger) {
        case 'hover':
          return {
            mouseenter: this.showHandler,
            mouseleave: this.hide
          }
        case 'focus':
          return {}
        case 'mouse':
          return {
            mousedown: this.showHandler,
            mouseup: this.hide
          }
        default:
          return {
            click: this.click
          }
      }
    },
    click () {
      this.toggle()
      if (this.onClick) {
        this.onClick()
      }
    },
    showHandler () {
      setTimeout(() => {
        this.isShow = true
      }, 200)
    },
    hide () {
      setTimeout(() => {
        this.isShow = false
      }, 200)
    },
    toggle () {
      this.isShow = !this.isShow
    },
    resize () {
      const popover = this.$refs.popover
      if (!popover) return
      const triger = this.$refs.trigger
      if (!triger) return
      popover.style.display = 'block'

      switch (this.placement) {
        case 'top':
          this.position.left = triger.offsetLeft - popover.offsetWidth / 2 + triger.offsetWidth / 2
          this.position.top = triger.offsetTop - popover.offsetHeight
          break
        case 'top left':
          this.position.left = triger.offsetLeft
          this.position.top = triger.offsetTop - popover.offsetHeight
          break
        case 'top right':
          this.position.left = triger.offsetLeft - (Math.abs(triger.offsetWidth - popover.offsetWidth))
          this.position.top = triger.offsetTop - popover.offsetHeight
          break
        case 'left':
          this.position.left = triger.offsetLeft - popover.offsetWidth
          this.position.top = triger.offsetTop + triger.offsetHeight / 2 - popover.offsetHeight / 2
          break
        case 'left top':
          this.position.left = triger.offsetLeft - popover.offsetWidth
          this.position.top = triger.offsetTop
          break
        case 'left bottom':
          this.position.left = triger.offsetLeft - popover.offsetWidth
          this.position.top = triger.offsetTop - (Math.abs(triger.offsetHeight - popover.offsetHeight))
          break
        case 'right':
          this.position.left = triger.offsetLeft + triger.offsetWidth
          this.position.top = triger.offsetTop + triger.offsetHeight / 2 - popover.offsetHeight / 2
          break
        case 'right top':
          this.position.left = triger.offsetLeft + triger.offsetWidth
          this.position.top = triger.offsetTop
          break
        case 'right bottom':
          this.position.left = triger.offsetLeft + triger.offsetWidth
          this.position.top = triger.offsetTop - (Math.abs(triger.offsetHeight - popover.offsetHeight))
          break
        case 'bottom':
          this.position.left = triger.offsetLeft - popover.offsetWidth / 2 + triger.offsetWidth / 2
          this.position.top = triger.offsetTop + triger.offsetHeight
          break
        case 'bottom left':
          this.position.left = triger.offsetLeft
          this.position.top = triger.offsetTop + triger.offsetHeight
          break
        case 'bottom right':
          this.position.left = triger.offsetLeft - (Math.abs(triger.offsetWidth - popover.offsetWidth))
          this.position.top = triger.offsetTop + triger.offsetHeight
          break
        default:
          break
      }
      popover.style.top = this.position.top + 'px'
      popover.style.left = this.position.left + 'px'
    }
  },
  mounted () {
    if (!this.$refs.popover) return
    this.resize()
    this.$refs.popover.style.display = 'none'
    this.isShow = false
    if (this.trigger === 'focus') {
      const input = this.$refs.trigger.querySelector('input')
      if (input) {
        input.removeEventListener('focus', this.showHandler)
        input.removeEventListener('blur', this.hide)

        input.addEventListener('focus', this.showHandler)
        input.addEventListener('blur', this.hide)
      }
    }
  }
}
export default PopoverMixin
