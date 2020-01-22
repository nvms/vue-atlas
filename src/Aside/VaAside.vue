<template>
  <transition :name="(this.placement === 'left') ? 'slideleft' : 'slideright'">
    <div :class="classObj" :style="{width:width}" ref="aside" v-show="show">
      <div class="va-aside-dialog">
        <div class="va-aside-content">
          <div class="va-aside-header" v-if="header">
            <button
              class="va-close"
              @click="close"
              type="button"
            >
              <span>&times;</span>
            </button>
            <div class="va-aside-title">{{title}}</div>
          </div>
          <div class="va-aside-body">
            <slot/>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import EventListener from '../utils/EventListener'
import createFocusTrap from 'focus-trap'
import element from '../utils/element'

export default {
  name: 'VaAside',
  props: {
    placement: {
      type: String,
      default: 'left',
      required: false
    },
    title: {
      type: String,
      default: '',
      required: false
    },
    header: {
      type: Boolean,
      default: false,
      required: false
    },
    width: {
      type: String,
      default: '304px',
      required: false
    }
  },
  data () {
    return {
      show: false,
      focusTrap: null
    }
  },
  computed: {
    classObj () {
      const { placement } = this
      const classes = {}

      classes['va-aside'] = true
      classes['va-aside-left'] = placement === 'left'
      classes['va-aside-right'] = placement === 'right'

      return classes
    }
  },
  created () {
    const escapeHandler = e => {
      if (e.key === 'Escape' && this.show) {
        this.close()
      }
    }
    document.addEventListener('keydown', escapeHandler)
    this.$once('hook:destroyed', () => {
      document.removeEventListener('keydown', escapeHandler)
    })
  },
  mounted () {
    document.querySelector('body').appendChild(this.$refs.aside)
    this.$once('hook:beforeDestroy', () => {
      document.querySelector('body').removeChild(this.$refs.aside)
    })

    this.focusTrap = createFocusTrap(this.$refs.aside, {
      clickOutsideDeactivates: true,
      returnFocusOnDeactivate: true,
      fallbackFocus: this.$refs.aside
    })
  },
  beforeDestroy () {
    this.performClose()
  },
  watch: {
    show (val) {
      const backdrop = document.createElement('div')
      const body = document.body
      backdrop.className = 'va-aside-backdrop'

      if (val) {
        body.appendChild(backdrop)
        element.addClass(body, 'va-modal-open')

        // This timeout is included to allow for opacity transition.
        setTimeout(() => {
          backdrop.className += ' ' + 'va-aside-in'
          this._clickEvent = EventListener.listen(backdrop, 'click', this.close)
          this.$emit('show')
        }, 20)

        this.focusTrap.activate()
      } else {
        this.focusTrap.deactivate()
        this.performClose()
      }
    }
  },
  methods: {
    open () {
      this.show = true
    },
    close () {
      this.show = false
    },
    performClose () {
      if (this._clickEvent) this._clickEvent.remove()

      const body = document.body
      const backdrop = document.querySelector(
        '.' + 'va-aside-backdrop'
      )

      if (backdrop) {
        backdrop.className = 'va-aside-backdrop'
        setTimeout(() => {
          element.removeClass(body, 'va-modal-open')
          body.removeChild(backdrop)
        }, 300)
        this.$emit('hide')
      }
    }
  }
}
</script>

<style lang="scss" src="../style/_reset.scss" scoped></style>
<style lang="scss">
@import "../variables";

.va-aside-open {
  transition: transform 0.15s;
}

.va-aside {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 10;
  overflow: auto;
  background: $N0;
  &-left {
    left: 0;
    right: auto;
  }
  &-right {
    right: 0;
    left: auto;
  }
  &:focus {
    outline: 0;
  }
  &-dialog {
    .va-aside-header {
      .va-close {
        font-size: 24px;
        color: $N300;
      }
      .va-aside-title {
        padding-top: 8px;
        font-size: 24px;
        color: $N300;
      }
    }
  }
  &-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 5;
    opacity: 0;
    transition: opacity 0.15s ease-in-out;
    background: rgba(9, 30, 66, 0.54);
  }
  &-in {
    opacity: 1;
  }
}
</style>
