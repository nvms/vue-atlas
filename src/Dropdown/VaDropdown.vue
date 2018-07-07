<template>
  <div :class="[`${prefixCls}-dropdown-con`, classObj]">
    <span ref="trigger">
      <slot name="trigger" />
    </span>

    <transition :name="effect" v-if="effect != 'collapse'">
      <ul v-va-position="isShow" :class="`${prefixCls}-dropdown-menu`" v-show="isShow">
        <slot />
      </ul>
    </transition>

    <va-collapse-transition v-if="effect=='collapse'">
      <ul :class="`${prefixCls}-dropdown-menu`" v-show="isShow">
        <slot />
      </ul>
    </va-collapse-transition>

  </div>
</template>

<script>
import EventListener from '../utils/EventListener'
import VaCollapseTransition from '../VaCollapseTransition'

export default {
  name: 'VaDropdown',
  props: {
    show: {
      type: Boolean,
      default: false,
      required: false,
      note: 'If true, the dropdown content is visible.'
    },
    triggerEvent: {
      type: String,
      default: 'click',
      required: false,
      note: 'Trigger method. Can be either \'click\' or \'hover\'.'
    },
    clickClose: {
      type: Boolean,
      default: false,
      required: false,
      note: `If true, require that the trigger element be clicked
            again in order to close the dropdown menu. Otherwise,
            clicking anywhere else in the window will close it.`
    },
    effect: {
      type: String,
      default: 'fadeDown',
      required: false,
      note: 'The effect to use. Try \'collapse\', \'fade\' or \'fadeDown\'.'
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
  methods: {
    open () {
      this.isShow = true
      this.$emit('show')
    },
    close () {
      this.isShow = false
      this.$emit('hide')
    },
    toggleDropdown () {
      this.isShow ? this.close() : this.open()
      this.$emit('toggle')
    }
  },
  components: {
    VaCollapseTransition
  },
  computed: {
    classObj () {
      let {prefixCls} = this
      let klass = {}

      klass[prefixCls + '-dropdown-selected'] = this.isShow

      return klass
    }
  },
  mounted () {
    this.$nextTick(() => {
      let el = this.$el
      let trig = this.$refs.trigger.children[0]
      if (this.triggerEvent === 'click') {
        this._clickEvent = EventListener.listen(trig, 'click', this.toggleDropdown)
        this._closeEvent = EventListener.listen(window, 'click', (e) => {
          if (!this.clickClose && !el.contains(e.target)) {
            this.close()
          }
        })
      } else if (this.triggerEvent === 'hover') {
        this._mouseenterEvent = EventListener.listen(trig, 'mouseenter', () => {
          this.open()
        })
        this._closeEvent = EventListener.listen(this.$el, 'mouseleave', () => {
          setTimeout(() => {
            this.close()
          }, 500)
        })
      }
    })
  },
  beforeDestroy () {
    if (this._closeEvent) this._closeEvent.remove()
    if (this._clickEvent) this._clickEvent.remove()
    if (this._mouseenterEvent) this._mouseenterEvent.remove()
  }
}
</script>

<style lang="scss">
</style>
