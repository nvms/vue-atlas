<template>
  <div :class="[`${classPrefix}-dropdown-con`, classObj]">
    <span ref="trigger" :focus="onFocus">
      <slot name="trigger" />
    </span>

    <transition :name="effect" v-if="effect != 'collapse'">
      <ul v-va-position="show" :class="`${classPrefix}-dropdown-menu`" v-show="show">
        <slot />
      </ul>
    </transition>

    <va-collapse-transition v-if="effect=='collapse'">
      <ul :class="`${classPrefix}-dropdown-menu`" v-show="show">
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
      note: 'The effect to use.'
    },
    tall: {
      type: Boolean,
      default: false,
      required: false
    },
    classPrefix: {
      type: String,
      default: 'va'
    }
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    open () {
      this.show = true
      this.$emit('show')
    },
    close () {
      this.show = false
      this.$emit('hide')
    },
    toggle () {
      this.show ? this.close() : this.open()
      this.$emit('toggle')
    },
    onFocus () {
    }
  },
  components: {
    VaCollapseTransition
  },
  computed: {
    classObj () {
      let {classPrefix, tall} = this
      let classes = {}

      classes[classPrefix + '-dropdown-selected'] = this.show
      classes[classPrefix + '-dropdown-con-tall'] = tall

      return classes
    }
  },
  mounted () {
    this.$nextTick(() => {
      let el = this.$el
      let trig = this.$refs.trigger.children[0]
      if (this.triggerEvent === 'click') {
        this._clickEvent = EventListener.listen(trig, 'click', this.toggle)
        this._closeEvent = EventListener.listen(window, 'click', (e) => {
          if (!this.clickClose && !el.contains(e.target) && this.show) {
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
