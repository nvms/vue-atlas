<template>
  <div :class="[`va-dropdown-con`, classObj]">
    <span ref="trigger" :focus="onFocus">
      <slot name="trigger"/>
    </span>

    <transition :name="effect">
      <ul
        v-va-position="show"
        class="va-dropdown-menu"
        v-show="show"
      >
        <slot/>
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
      required: false
    },
    clickClose: {
      type: Boolean,
      default: false,
      required: false
    },
    effect: {
      type: String,
      default: 'fadeDown',
      required: false
    },
    tall: {
      type: Boolean,
      default: false,
      required: false
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
    onFocus () {}
  },
  computed: {
    classObj () {
      const { tall } = this
      const classes = {}

      classes['va-dropdown-selected'] = this.show
      classes['va-dropdown-con-tall'] = tall

      return classes
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (!this.$refs.trigger) {
        return
      }
      const el = this.$el
      const trig = this.$refs.trigger.children[0]
      if (this.triggerEvent === 'click') {
        this._clickEvent = EventListener.listen(trig, 'click', this.toggle)
        this._closeEvent = EventListener.listen(window, 'click', e => {
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

<style lang="scss" src="../style/_reset.scss" scoped></style>
<style lang="scss">
@import "../variables";

@mixin dropdown-theme-mixin(
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
    .va-dropdown-menu {
      background: $menuBackground;
      box-shadow: $menuBoxShadow;
      &::-webkit-scrollbar-thumb {
        background: $menuScrollbarThumbBackground;
        &:hover {
          background: $menuScrollbarThumbBackgroundHover;
        }
      }
      > li > a:not(.va-select-item-active),
      > div > li > a:not(.va-select-item-active) {
        color: $liAnchorColor !important;
        &:hover {
          background: $liAnchorColorHoverBackground;
        }
        &:active {
          color: $liAnchorColorActiveColor !important;
          background: $liAnchorColorActiveBackground !important;
        }
      }
    }
  }
  /*
  The following styles apply to a button that exists as a dropdown
  trigger that is currently active, meaning the dropdown is opened.
  */
  &-selected {
    > span > div > button.va-btn {
      background: $selectedBackground !important;
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
    >span>div>button.va-btn-primary {
      background: $B300;
      color: $N20;
    }
  }

  For now, though, we just use one style for all types of buttons.
  */
}

.va-dropdown,
.va--theme-light.va-dropdown {
  @include dropdown-theme-mixin(
    $menuBackground: $N0,
    $menuBoxShadow: (
      rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
      rgba(9, 30, 66, 0.31) 0px 0px 1px
    ),
    $menuScrollbarThumbBackground: rgba(23, 47, 87, 0.22),
    $menuScrollbarThumbBackgroundHover: rgba(9, 30, 66, 0.45),
    $liAnchorColor: $N800,
    $liAnchorColorHoverBackground: $N20,
    $liAnchorColorActiveBackground: $B75,
    $liAnchorColorActiveColor: inherit,
    $selectedBackground: $N700,
    $selectedColor: $N0,
    $selectedHoverBackground: $N700,
    $selectedHoverColor: $N0
  );
}

.va-dropdown-con {
  position: relative;
  display: inline-block;
  vertical-align: middle;

  .va-dropdown-menu {
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
    border-radius: 3px;
    list-style-type: none;
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
    }

    > li,
    > div > li {
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

    > li > a,
    > div > li > a {
      display: flex;
      justify-content: space-between;
      padding: 5px 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.5;
      text-decoration: none;

      &:hover {
        text-decoration: none !important;
        color: red;
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

.va-dropdown {
  position: relative;
}

.va-dropdown-toggle:focus {
  outline: 0;
}

/**
Dropdowns, while active, don't need a focus ring. It shows focus state by changing the background color.
*/
.va-dropdown-con.va-dropdown-selected
  > span
  > div
  > .va-btn:focus:not(:active):not(.va-select-btn-open),
.va-dropdown-con.va-dropdown-selected
  > span
  > div
  > .va-btn-focused:not(:active):not(.va-select-btn-open) {
  box-shadow: none !important;
}

/**
The following styles apply to a button that exists as a dropdown trigger
that resides inside of the va-topbar element.
*/

.va-topbar--theme-blue {
  .va-dropdown-selected {
    > span > div > button.va-btn {
      background-color: $B500;
      color: $N20;
    }

    > span > div > button.va-btn-primary-dark {
      background: $B400;
    }
  }
}

.va-topbar--theme-purple {
  .va-dropdown-selected {
    > span > div > button.va-btn {
      background-color: $P400;
      color: $N20;
    }

    > span > div > button.va-btn-purple-dark {
      background: $P400;
    }
  }
}

.va-topbar {
  .va-dropdown-con-tall {
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
