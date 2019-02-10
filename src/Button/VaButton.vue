<template>
    <a :class="classObj"
       :style="styleObj"
       @click="$emit('click')"
       @keyup.enter="enterPressed"
       ref="btn"
       tabindex="0">
        <div :class="fadeclassObj">
            <slot/>
            <va-badge :margin="badgeMargin" v-if="badge">{{badge}}</va-badge>
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
        values: ['default', 'primary'],
        note: 'The style of button to render.',
        validator(v) {
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
        note: 'The size of button to render.',
        validator(v) {
          return [
            'xs',
            'sm',
            'md',
            'lg'
          ].includes(v)
        }
      },
      badge: {
        type: [String, Number],
        required: false,
        note: 'Adds an VaBadge to the button.'
      },
      badgeMargin: {
        type: String,
        default: '0 5px 0 10px',
        required: false,
        note: 'Margin to be applied to the outside of the badge element. The default value works well for badges displayed to the right of the button text.'
      },
      active: {
        type: Boolean,
        default: false,
        required: false,
        note: 'If true, applies the .${classPrefix}-btn-active class.'
      },
      disabled: {
        type: Boolean,
        default: false,
        required: false,
        note: 'If true, applies the .${classPrefix}-btn-disabled class.'
      },
      block: {
        type: Boolean,
        default: false,
        required: false,
        note: 'If true, applies the .${classPrefix}-btn-block class.'
      },
      loading: {
        type: Boolean,
        default: false,
        required: false,
        note: 'If true, hides text and shows classPrefix-loading spinner.'
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
      classPrefix: {
        type: String,
        default: 'va'
      }
    },
    data() {
      let loading = this.loading
      return {
        loadingSpinner: loading,
        isFocused: this.focused
      }
    },
    computed: {
      spinColor() {
        let {type} = this
        let white = '#FFFFFF'
        let darker = '#45526B'

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
      classObj() {
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
      fadeclassObj() {
        let {classPrefix, loadingSpinner} = this
        let classes = {}

        classes[classPrefix + '-btn-text-fade'] = true
        loadingSpinner ? classes[classPrefix + '-btn-text-fade-out'] = true : ''

        return classes
      },
      styleObj() {
        let {tall} = this
        let style = {}

        if (tall) {
          style['height'] = '100%'
          style['border-radius'] = '0px'
        }

        return style
      }
    },
    watch: {
      loading(val) {
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
      enterPressed() {
        this.$emit('click')
        let el = this.$refs.btn
        let evObj = document.createEvent('Events')
        evObj.initEvent('click', true, false)
        el.dispatchEvent(evObj)
      },
      focus() {
        this.$refs.btn.focus()
      }
    },
    mounted() {
      this.$nextTick(() => {
        let el = this.$el

        this._clickEvent = EventListener.listen(window, 'click', (e) => {
          if (!el.contains(e.target)) {
            this.isFocused = false
          }
        })
      })
    },
    beforeDestroy() {
      if (this._clickEvent) this._clickEvent.remove()
    }
  }
</script>
