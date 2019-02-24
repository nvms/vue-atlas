<template>
  <a
    :class="classObj"
    :style="styleObj"
    @click="onClick"
    @keydown.enter="enterKeyDown"
    @keyup.enter="enterKeyUp"
    ref="btn"
    tabindex="0">
    <div
      :class="innerClassObj"
      :style="innerStyleObj">
      <va-icon
        v-if="iconBefore !== undefined"
        :type="iconBefore"
        :style="iconBeforeStyleObj" />
        <slot/>
        <va-icon
          v-if="iconAfter !== undefined"
          :type="iconAfter"
          :style="iconAfterStyleObj" />
    </div>
    <va-loading :color="spinColor" :size="size" v-if="loadingSpinner"/>
  </a>
</template>

<script>
  import EventListener from '../utils/EventListener'

  export default {
    name: 'VaButton',
    props: {
      type: {
        type: String,
        default: 'default',
        required: false,
        validator (v) {
          return [
            'default',
            'primary',
            'primary-light',
            'primary-dark',
            'paleblue',
            'success',
            'info',
            'warning',
            'danger',
            'subtle',
            'link',
            'subtle-link',
            'active',
            'dark',
            'darker',
            'purple',
            'purple-light',
            'purple-dark',
            'black'
          ].includes(v)
        }
      },
      size: {
        type: String,
        default: 'md',
        required: false,
        validator (v) {
          return [
            'xs',
            'sm',
            'md',
            'lg'
          ].includes(v)
        }
      },
      active: {
        type: Boolean,
        default: false,
        required: false
      },
      disabled: {
        type: Boolean,
        default: false,
        required: false
      },
      block: {
        type: Boolean,
        default: false,
        required: false
      },
      loading: {
        type: Boolean,
        default: false,
        required: false
      },
      round: {
        type: Boolean,
        default: false,
        required: false
      },
      focused: {
        type: Boolean,
        default: false,
        required: false
      },
      tall: {
        type: Boolean,
        default: false,
        required: false
      },
      iconBefore: {
        type: String,
        required: false
      },
      iconAfter: {
        type: String,
        required: false
      },
      classPrefix: {
        type: String,
        default: 'va'
      }
    },
    data () {
      let loading = this.loading
      return {
        loadingSpinner: loading,
        isFocused: this.focused,
        componentWasMounted: false
      }
    },
    computed: {
      spinColor () {
        let {type, active} = this
        let white = '#FFFFFF'
        let darker = '#45526B'

        if (active) {
          return darker
        }

        switch (type) {
          case 'default':
            return darker
          case 'primary':
            return white
          case 'primary-light':
            return white
          case 'primary-dark':
            return white
          case 'success':
            return white
          case 'info':
            return white
          case 'warning':
            return darker
          case 'subtle':
            return darker
          case 'link':
            return darker
          case 'subtle-link':
            return darker
          case 'danger':
            return white
          case 'dark':
            return white
          case 'darker':
            return white
        }

        return white
      },
      classObj () {
        let {classPrefix, type, size, block, active, disabled, round, isFocused} = this
        let classes = {}

        classes[classPrefix + '-btn'] = true
        classes[classPrefix + '-btn-block'] = block
        classes[classPrefix + '-btn-active'] = active
        classes[classPrefix + '-btn-disabled'] = disabled
        size ? classes[classPrefix + '-btn-' + size] = true : ''
        type ? classes[classPrefix + '-btn-' + type] = true : ''
        classes[classPrefix + '-btn-round'] = round

        classes[classPrefix + '-btn-' + type + '-focused'] = isFocused

        return classes
      },
      innerClassObj () {
        let {classPrefix, loadingSpinner} = this
        let classes = {}

        classes[classPrefix + '-btn-text-fade'] = true
        loadingSpinner ? classes[classPrefix + '-btn-text-fade-out'] = true : ''

        return classes
      },
      innerStyleObj () {
        let {iconBefore, iconAfter} = this
        let style = {}

        if (this.componentWasMounted) {
          let rect
          let adjust = 0
          let l = iconBefore !== undefined ? true : false
          let r = iconAfter !== undefined ? true : false

          if (l || r) {
            rect = this.$el.getBoundingClientRect()
            adjust = rect.width
          }
          if (this.$el.style.width !== '100%') {
            if (l) {
              adjust += 20
              style['padding-left'] = '20px'
            }
            if (r) {
              adjust += 20
              style['padding-right'] = '20px'
            }
          }
          if (rect && adjust > rect.width) {
            style['min-width'] = adjust + 'px'
          }
        }

        return style
      },
      styleObj () {
        let {tall} = this
        let style = {}

        if (tall) {
          style['height'] = '100%'
          style['border-radius'] = '0px'
        }

        return style
      },
      iconBeforeStyleObj () {
        let style = {}

        style['position'] = 'absolute'
        style['left'] = '3px'

        return style
      },
      iconAfterStyleObj () {
        let style = {}

        style['position'] = 'absolute'
        style['right'] = '3px'

        return style
      }
    },
    watch: {
      loading (val) {
        if (val) {
          let rect = this.$el.getBoundingClientRect()

          this.$el.style.width = rect.width + 'px'
          this.$el.style.height = rect.height + 'px'

          this.loadingSpinner = true
        } else {
          this.$el.style.width = 'auto'
          this.$el.style.height = 'auto'
          this.$nextTick(() => {
            this.loadingSpinner = false
          })
        }
      }
    },
    methods: {
      triggerMouseEvent (node, eventType) {
        let clickEvent = document.createEvent('MouseEvents')
        clickEvent.initEvent(eventType, true, true)
        this.$refs.btn.dispatchEvent(clickEvent)
      },
      enterKeyDown () {
        this.triggerMouseEvent(this.$refs.btn, 'mouseover')
        this.triggerMouseEvent(this.$refs.btn, 'mousedown')
      },
      enterKeyUp () {
        if (this.disabled) {
          return
        }
        this.triggerMouseEvent(this.$refs.btn, 'mouseup')
        this.triggerMouseEvent(this.$refs.btn, 'click')
      },
      focus () {
        this.$refs.btn.focus()
      },
      onClick () {
        if (this.disabled) {
          return
        }
        this.$emit('click')
      }
    },
    mounted () {
      this.$nextTick(() => {
        let el = this.$el

        this.componentWasMounted = true

        this._clickEvent = EventListener.listen(window, 'click', (e) => {
          if (!el.contains(e.target)) {
            this.isFocused = false
          }
        })
      })
    },
    beforeDestroy () {
      if (this._clickEvent) this._clickEvent.remove()
    }
  }
</script>
