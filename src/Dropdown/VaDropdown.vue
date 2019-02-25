<template>
  <div :class="[`${classPrefix}-dropdown-con`, classObj]">
    <span ref="trigger" :focus="onFocus">
      <slot name="trigger" />
    </span>

    <transition :name="effect">
      <ul v-va-position="show" :class="`${classPrefix}-dropdown-menu`" v-show="show">
        <slot />
      </ul>
    </transition>

  </div>
</template>

<script>
  import EventListener from '../utils/EventListener'

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
@mixin dropdown-theme-mixin (
  $menuBackground,
  $menuBoxShadow,
  $menuScrollbarThumbBackground,
  $menuScrollbarThumbBackgroundHover,
  $liAnchorColor,
  $liAnchorColorHoverBackground,
  $liAnchorColorActiveBackground,
  $liAnchorColorActiveColor,
  $selectedBackground,
  $selectedColor,
  $selectedHoverBackground,
  $selectedHoverColor
  ) {
  &-con {
    .#{$class-prefix}-dropdown-menu {
      background: $menuBackground;
      box-shadow: $menuBoxShadow;
      &::-webkit-scrollbar-thumb {
        background: $menuScrollbarThumbBackground;
        &:hover {
          background: $menuScrollbarThumbBackgroundHover;
        }
      }
      >li>a, >div>li>a {
        color: $liAnchorColor;
        &:hover {
          background: $liAnchorColorHoverBackground
        }
        &:active {
          color: $liAnchorColorActiveColor;
          background: $liAnchorColorActiveBackground;
        }
      }
    }
  }
  /*
  The following styles apply to a button that exists as a dropdown
  trigger that is currently active, meaning the dropdown is opened.
  */
  &-selected {
    >span>div>a.#{$class-prefix}-btn {
      background: $selectedBackground;
      color: $selectedColor;
      &:hover {
        background: $selectedHoverBackground;
        color: $selectedHoverColor;
      }
    }
  }
  /*
  If we want, we can apply different styles to different types of buttons,
  doing something like this:

  &-selected {
    >span>div>a.#{$class-prefix}-btn-primary {
      background: $B300;
      color: $N20;
    }
  }

  For now, though, we just use one style for all types of buttons.
  */
}

.#{$class-prefix}-dropdown,
.#{$class-prefix}--theme-light.#{$class-prefix}-dropdown {
  @include dropdown-theme-mixin(
    $menuBackground: $N0,
    $menuBoxShadow: (rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.31) 0px 0px 1px),
    $menuScrollbarThumbBackground: rgba(23, 47, 87, 0.22),
    $menuScrollbarThumbBackgroundHover: rgba(9, 30, 66, 0.45),
    $liAnchorColor: $N800,
    $liAnchorColorHoverBackground: #e8eaef,
    $liAnchorColorActiveBackground: $B75,
    $liAnchorColorActiveColor: inherit,
    $selectedBackground: $B50,
    $selectedColor: $B400,
    $selectedHoverBackground: $B50,
    $selectedHoverColor: $B400
  );
}

.#{$class-prefix}-dropdown-con>span>div>a.#{$class-prefix}-btn,
.#{$class-prefix}-dropdown-con>span>div>a.#{$class-prefix}-btn:hover {
  cursor: default;
}

.#{$class-prefix}-dropdown-con {
  position: relative;
  display: inline-block;
  vertical-align: middle;

  .#{$class-prefix}-dropdown-menu {
    position: absolute;
    overflow: auto;
    top: 100%;
    left: 0;
    z-index: 1000;
    float: left;
    min-width: 160px;
    max-height: 300px;
    box-sizing: border-box;
    padding: 4px 0;
    margin-top: 6px;
    margin-bottom: 6px;
    border-radius: 4px;
    list-style-type: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;

    hr {
      margin: 5px 0;
      border-bottom-width: 1px;
    }

    &::-webkit-scrollbar-track {
      border-radius: 5px;
    }

    &::-webkit-scrollbar {
      width: 0px;
      padding: 5px 2px 5px 0;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
    }

    &:hover {
      &::-webkit-scrollbar {
        width: 7px;
      }

      // overflow-y: auto;
    }

    >li, >div>li {
      white-space: nowrap;
      display: block;

      a {
        i {
          padding-left: 12px !important;
          position: relative;
          top: 3px;
        }
      }
    }

    >li>a, >div>li>a {
      display: flex;
      justify-content: space-between;
      padding: 5px 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.5;

      &:hover {
        text-decoration: none;
      }

      &:active {
        text-decoration: none;
        outline: none;
      }

      &:focus {
        outline: none;
      }
    }
  }
}

.#{$class-prefix}-dropdown {
  position: relative;
}

.#{$class-prefix}-dropdown-toggle:focus {
  outline: 0;
}

/**
Dropdowns, while active, don't need a focus ring. It shows focus state by changing the background color.
*/
.#{$class-prefix}-dropdown-con.#{$class-prefix}-dropdown-selected>span>div>.#{$class-prefix}-btn:focus:not(:active):not(.#{$class-prefix}-select-btn-open),
.#{$class-prefix}-dropdown-con.#{$class-prefix}-dropdown-selected>span>div>.#{$class-prefix}-btn-focused:not(:active):not(.#{$class-prefix}-select-btn-open) {
  box-shadow: none !important;
}

/**
The following styles apply to a button that exists as a dropdown trigger
that resides inside of the va-topbar element.
*/

.#{$class-prefix}-topbar--theme-blue {
  .#{$class-prefix}-dropdown-selected {
    >span>div>a.#{$class-prefix}-btn {
      background-color: $B500;
      color: $N20;
    }

    >span>div>a.#{$class-prefix}-btn-primary-dark {
      background: $B400;
    }
  }
}

.#{$class-prefix}-topbar--theme-purple {
  .#{$class-prefix}-dropdown-selected {
    >span>div>a.#{$class-prefix}-btn {
      background-color: $P400;
      color: $N20;
    }

    >span>div>a.#{$class-prefix}-btn-purple-dark {
      background: $P400;
    }
  }
}

.#{$class-prefix}-topbar {
  .#{$class-prefix}-dropdown-con-tall {
    height: 100%;
    > span {
      height: 100%;
      > div {
        height: 100%;
        > a {
          height: 100%;
          border-radius: 0px !important;
        }
      }
    }
  }
}
</style>
