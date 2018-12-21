<template>
  <transition :name="(this.placement === 'left') ? 'slideleft' : 'slideright'">
    <div
      ref="aside"
      :style="{width:width}"
      :class="classObj"
      v-show="show">
      <div :class="`${prefixCls}-aside-dialog`">
        <div :class="`${prefixCls}-aside-content`">
          <div :class="`${prefixCls}-aside-header`" v-if="header">
            <button type="button" :class="`${prefixCls}-close`" @click="close"><span>&times;</span></button>
            <div :class="`${prefixCls}-aside-title`">{{title}}</div>
          </div>
          <div :class="`${prefixCls}-aside-body`">
            <slot/>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import EventListener from '../utils/EventListener'
// import getScrollBarWidth from '../utils/getScrollBarWidth'
import element from '../utils/element'

export default {
  name: 'VaAside',
  props: {
    placement: {
      type: String,
      default: 'left',
      required: false,
      note: 'What side of the window to appear at.'
    },
    title: {
      type: String,
      default: '',
      required: false,
      note: 'If header is true, this will be the inside of it.'
    },
    header: {
      type: Boolean,
      default: false,
      required: false,
      note: 'If true, header will be shown.'
    },
    width: {
      type: String,
      default: '304px',
      required: false,
      note: 'Width of the aside element.'
    },
    prefixCls: {
      type: String,
      default: 'va',
      required: false
    }
  },
  data () {
    return {
      show: false
    }
  },
  mounted () {
    const $body = document.querySelector('body')
    $body.appendChild(this.$refs.aside)
  },
  beforeDestroy () {
    const $body = document.querySelector('body')
    $body.removeChild(this.$refs.aside)
    this.performClose()
  },
  computed: {
    classObj () {
      let {prefixCls, placement} = this
      let klass = {}

      klass[prefixCls + '-aside'] = true
      klass[prefixCls + '-aside-left'] = placement === 'left'
      klass[prefixCls + '-aside-right'] = placement === 'right'

      return klass
    }
  },
  watch: {
    show (val) {
      let backdrop = document.createElement('div')
      let prefixCls = this.prefixCls
      const body = document.body
      backdrop.className = prefixCls + '-aside-backdrop'
      if (val) {
        body.appendChild(backdrop)
        element.addClass(body, prefixCls + '-modal-open')

        // This timeout is included to allow for opacity transition.
        setTimeout(() => {
          backdrop.className += ' ' + prefixCls + '-aside-in'
          this._clickEvent = EventListener.listen(backdrop, 'click', this.close)
          this.$emit('show')
        }, 20)
      } else {
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
      let prefixCls = this.prefixCls
      let backdrop = document.querySelector('.' + prefixCls + '-aside-backdrop')

      if (backdrop) {
        backdrop.className = prefixCls + '-aside-backdrop'
        setTimeout(() => {
          element.removeClass(body, prefixCls + '-modal-open')
          body.removeChild(backdrop)
        }, 300)
        this.$emit('hide')
      }
    }
  }
}
</script>
