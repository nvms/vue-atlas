<template>
  <div>
    <div v-if="tag === 'div'">
      <slot/>
    </div>
    <ul v-if="tag === 'ul'">
      <slot/>
    </ul>
    <ol v-if="tag === 'ol'">
      <slot/>
    </ol>
    <form v-if="tag === 'form'">
      <slot/>
    </form>
  </div>
</template>

<script>
import velocity from 'velocity-animate'
import ANIM_TYPES from './animTypes'

const BackEase = {
  easeInBack: [0.6, -0.28, 0.735, 0.045],
  easeOutBack: [0.175, 0.885, 0.32, 1.275],
  easeInOutBack: [0.68, -0.55, 0.265, 1.55]
}

function transformArguments (arg) {
  if (Array.isArray(arg) && arg.length === 2) {
    return arg
  }
  return [arg, arg]
}

export default {
  name: 'VaAnimQueue',
  props: {
    show: {
      type: Boolean,
      default: false,
      required: false
    },
    tag: {
      type: String,
      default: 'div',
      validator (v) {
        return ['div', 'form', 'ul', 'ol'].includes(v)
      },
      required: false
    },
    interval: {
      type: [Number, Array],
      default: 100,
      required: false
    },
    duration: {
      type: [Number, Array, String],
      default: 500,
      required: false
    },
    delay: {
      type: [Number, Array, String],
      default: 0,
      required: false
    },
    type: {
      type: [String, Array],
      default: 'right',
      required: false
    },
    animConfig: {
      type: [String, Array],
      required: false
    },
    ease: {
      type: [String, Array],
      default: 'easeOutQuart',
      required: false
    },
    watchValue: {
      type: [String, Array],
      required: false
    },
    leaveReverse: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data () {
    return {
      animatingClassName: [],
      originChildren: [],
      children: [],
      childrenShow: {}
    }
  },
  mounted () {
    this.animatingClassName = [
      'va-anim-queue-entering',
      'va-anim-queue-leaving'
    ]

    // this.$nextTick(() => {
    this.keysAnimating = []
    const freeChild = this._getFreeKeysAndChild()
    this.keysAnimating = Object.keys(freeChild)
    this.children = freeChild
    this.originChildren = freeChild

    this.$on('VaAnimQueueHidden', () => {
      this._hiddenVelocityNode()
      return true
    })

    if (this.show) {
      this._animateEnter()
    }
    // })
  },
  beforeDestroy () {
    if (this.originChildren && this.originChildren.length > 0) {
      this.originChildren.forEach(child => {
        velocity(child, 'stop')
      })
    }
  },
  computed: {
    usedSlot () {
      switch (this.tag) {
        case 'div':
          return this.$slots.divslot
        case 'ul':
          return this.$slots.ulslot
        case 'ol':
          return this.$slots.olslot
        case 'form':
          return this.$slots.formslot
        default:
          return false
      }
    }
  },
  isActHideAnimate: false,
  watch: {
    show (value) {
      if (value) {
        this.isActHideAnimate = true

        this.$nextTick(() => {
          this.$emit('VaAnimQueueHidden')
          setTimeout(() => {
            this._animateEnter()
            this.isActHideAnimate = false
          }, 50)
        })
      } else {
        this._animateLeave(() => {
          if (!this.isActHideAnimate) {
            this.$emit('VaAnimQueueHidden')
          }
        })
      }
    },
    // watchValue (newValue, oldValue) {
    watchValue () {
      this.$nextTick(() => {
        const shouldEnterChild = []
        const shouldLeaveChild = []
        const newChild = this._getKeysChild()
        // const nodeMap = {}

        for (let i = 0; i < this.children.length; i++) {
          const curChild = this.children[i]
          let hasRemove = true

          for (let j = 0; j < newChild.length; j++) {
            if (curChild.key === newChild[j].key) {
              hasRemove = false
            }
          }
          if (hasRemove) {
            shouldLeaveChild.push(curChild)
          }
        }

        for (let i = 0; i < newChild.length; i++) {
          const curChild = newChild[i]
          let hasAdd = true

          for (let j = 0; j < this.children.length; j++) {
            if (curChild.key === this.children[j].key) {
              hasAdd = false
            }
          }
          if (hasAdd) {
            shouldEnterChild.push(curChild)
          }
        }

        shouldEnterChild.forEach(this._performEnter)
        shouldLeaveChild.forEach(this._performLeave)

        this.children = newChild
      })
    }
  },
  methods: {
    _getKeysChild () {
      const ret = []
      const keyNodes = Array.prototype.slice.call(
        this.$el.querySelectorAll('[anim-key]')
      )

      keyNodes.forEach(child => {
        if (!child) {
          return
        }

        child.setAttribute('__scope_key__', 1)

        const key = child.getAttribute('anim-key')

        if (!key) {
          return
        }

        ret.push({
          key: key,
          el: child
        })
      })

      return ret
    },
    _getFreeKeysAndChild () {
      const ret = []
      const keyNodes = Array.prototype.slice.call(
        this.$el.querySelectorAll('[anim-key]:not([__scope_key__])')
      )

      keyNodes.forEach(child => {
        if (!child) {
          return
        }

        child.setAttribute('__scope_key__', 1)

        const key = child.getAttribute('anim-key')

        if (!key) {
          return
        }

        ret.push({
          key: key,
          el: child
        })
      })

      return ret
    },
    _getVelocityConfig (index) {
      if (this.animConfig) {
        return transformArguments(this.animConfig)[index]
      }
      return ANIM_TYPES[transformArguments(this.type)[index]]
    },
    _getVelocityEnterConfig () {
      return this._getVelocityConfig(0)
    },
    _getVelocityLeaveConfig () {
      const config = this._getVelocityConfig(1)
      const ret = {}

      Object.keys(config).forEach(key => {
        if (Array.isArray(config[key])) {
          ret[key] = Array.prototype.slice.call(config[key]).reverse()
        } else {
          ret[key] = config[key]
        }
      })
      return ret
    },
    _getVelocityEasing () {
      return transformArguments(this.ease).map(easeName => {
        if (typeof easeName === 'string') {
          return BackEase[easeName] || easeName
        }
      })
    },
    _hiddenVelocityNode () {
      this.children.forEach(item => {
        const node = item.el
        if (!node) {
          return
        }
        node.style.visibility = 'hidden'
        velocity(node, 'stop')
      })
    },
    _animateEnter () {
      this.children.forEach(this._performEnter)
    },
    _performEnter (item, i) {
      const node = item.el
      const key = item.key

      if (!node) {
        return
      }

      const interval = parseInt(transformArguments(this.interval)[0])
      const delay = parseInt(transformArguments(this.delay)[0])
      const duration = parseInt(transformArguments(this.duration)[0])
      node.style.visibility = 'hidden'
      velocity(node, 'stop')
      velocity(node, this._getVelocityEnterConfig('enter'), {
        delay: (interval * i * delay) / 100,
        duration: duration,
        easing: this._getVelocityEasing()[0],
        visibility: 'visible',
        begin: elements => {
          this._enterBegin(key, elements)
          if (node.__vue__) {
            const _enterFn = node.__vue__._animateEnter
            _enterFn && _enterFn()

            const children = node.__vue__.$children
            children.forEach(item => {
              item._animateEnter && item._animateEnter()
            })
          }
        },
        complete: this._enterComplete.bind(this, key)
      })
    },
    _animateLeave (done) {
      this.children.forEach((item, i) => {
        this._performLeave(item, i, done)
      })
    },
    _performLeave (item, i, done) {
      const node = item.el
      const key = item.key
      if (!node) {
        return
      }
      const interval = parseInt(transformArguments(this.interval)[1])
      const delay = parseInt(transformArguments(this.delay)[1])
      const duration = parseInt(transformArguments(this.duration)[1])
      const order = this.leaveReverse ? this.children.length - i - 1 : i

      velocity(node, 'stop')
      velocity(node, this._getVelocityLeaveConfig('leave'), {
        delay: interval * order + delay,
        duration: duration,
        easing: this._getVelocityEasing()[1],
        begin: this._leaveBegin.bind(this),
        complete: elements => {
          this._leaveComplete(key, elements)
          const len = this.children.length
          if (i === len - 1) {
            done && done()
          }
        }
      })
    },
    _enterBegin (key, elements) {
      const self = this
      if (this.keysAnimating.indexOf(key) >= 0) {
        this.keysAnimating.splice(this.keysAnimating.indexOf(key), 1)
      }
      elements.forEach(elem => {
        elem.className = elem.className
          .replace(self.animatingClassName[1], '')
          .trim()
        elem.className += ' ' + self.animatingClassName[0]
      })
    },
    _enterComplete (key, elements) {
      const self = this
      if (this.keysAnimating.indexOf(key) >= 0) {
        this.keysAnimating.splice(this.keysAnimating.indexOf(key), 1)
      }
      elements.forEach(elem => {
        elem.className = elem.className
          .replace(self.animatingClassName[0], '')
          .trim()
      })
    },
    _leaveBegin (elements) {
      const self = this
      elements.forEach(elem => {
        elem.className = elem.className
          .replace(self.animatingClassName[0], '')
          .trim()
        elem.className += ' ' + self.animatingClassName[1]
      })
    },
    _leaveComplete (key, elements) {
      const self = this
      if (this.keysAnimating.indexOf(key) < 0) {
        return
      }
      this.keysAnimating.splice(this.keysAnimating.indexOf(key), 1)
      elements.forEach(elem => {
        elem.className = elem.className
          .replace(self.animatingClassName[1], '')
          .trim()
      })
    }
  }
}
</script>
