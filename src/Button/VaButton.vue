<template>
  <button
    :class="classObj"
    :style="styleObj"
    @click="onClick"
    @keydown.enter="enterKeyDown"
    @keyup.enter="enterKeyUp"
    ref="btn"
  >
    <div :class="innerClassObj" :style="innerStyleObj">
      <va-icon
        v-if="iconBefore !== undefined"
        :type="iconBefore"
        :style="iconBeforeStyleObj"
      />
      <slot/>
      <va-icon
        v-if="iconAfter !== undefined"
        :type="iconAfter"
        :style="iconAfterStyleObj"
      />
    </div>
    <va-loading :color="spinColor" :size="size" v-if="loadingSpinner"/>
  </button>
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
          'help',
          'help-light',
          'help-dark',
          'black'
        ].includes(v)
      }
    },
    size: {
      type: String,
      default: 'md',
      required: false,
      validator (v) {
        return ['xs', 'sm', 'md', 'lg'].includes(v)
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
      let { type, active } = this
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
      let {
        type,
        size,
        block,
        active,
        disabled,
        round,
        isFocused
      } = this
      let classes = {}

      classes['va-btn'] = true
      classes['va-btn-block'] = block
      classes['va-btn-active'] = active
      classes['va-btn-disabled'] = disabled
      size ? (classes['va-btn-' + size] = true) : ''
      type ? (classes['va-btn-' + type] = true) : ''
      classes['va-btn-round'] = round

      classes['va-btn-' + type + '-focused'] = isFocused

      return classes
    },
    innerClassObj () {
      let { loadingSpinner } = this
      let classes = {}

      classes['va-btn-text-fade'] = true
      loadingSpinner ? (classes['va-btn-text-fade-out'] = true) : ''

      return classes
    },
    innerStyleObj () {
      let { iconBefore, iconAfter } = this
      let style = {}

      if (this.componentWasMounted) {
        let l = iconBefore !== undefined
        let r = iconAfter !== undefined

        if (this.$el.style.width !== '100%') {
          if (l) {
            style['padding-left'] = '26px'
          }
          if (r) {
            style['padding-right'] = '26px'
          }
        }
      }

      return style
    },
    styleObj () {
      let { tall } = this
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

      this._clickEvent = EventListener.listen(window, 'click', e => {
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

<style lang="scss">
@mixin btn-type-mixin(
  $bgCol,
  $fontCol,
  $bgColHover,
  $fontColHover,
  $bgColActive,
  $fontColActive
) {
  background-color: $bgCol;
  color: $fontCol;

  &:hover:not(.va-btn-disabled) {
    background-color: $bgColHover;
    color: $fontColHover;
  }

  &:active:not(.va-btn-disabled) {
    background-color: $bgColActive;
    color: $fontColActive;
  }
}

@mixin button-focus-mixin($boxShadowColor, $boxShadowOpacity: 0.6) {
  // no ring on hover
  // &:focus:not(:active):not(:hover), &-focused:not(:active):not(:hover) {
  //   box-shadow: $color 0px 0px 0px 2px; /* fallback */
  //   box-shadow: rgba($color, $opacity) 0px 0px 0px 2px;
  //   outline: none;
  // }
  // ring on hover
  &:focus:not(:active):not(.va-select-btn-open):not(.va-btn-disabled),
  &-focused:not(:active):not(.va-select-btn-open):not(.va-btn-disabled) {
    box-shadow: inset $boxShadowColor 0px 0px 0px 2px;
    /* fallback */
    box-shadow: inset rgba($boxShadowColor, $boxShadowOpacity) 0px 0px 0px 2px;
    outline: none;
  }
}

@mixin button-outline-mixin($outlineColor, $outlineWidth, $activeOutlineColor) {
  box-shadow: inset $outlineColor 0px 0px 0px $outlineWidth;
  outline: none;

  &:active {
    box-shadow: inset $activeOutlineColor 0px 0px 0px $outlineWidth;
  }
}

.va-btn {
  &-default {
    @include btn-type-mixin(
      $bgCol: $N20,
      $fontCol: $N400,
      $bgColHover: $N30,
      $fontColHover: $N400,
      $bgColActive: $B50,
      $fontColActive: $B400
    );
    @include button-focus-mixin($B100, 1);
  }

  &-primary {
    @include btn-type-mixin(
      $bgCol: $B400,
      $fontCol: $N0,
      $bgColHover: $B300,
      $fontColHover: $N0,
      $bgColActive: $B500,
      $fontColActive: $N0
    );
    @include button-focus-mixin($B100, 1);
  }

  &-primary-light {
    @include btn-type-mixin(
      $bgCol: $B300,
      $fontCol: $N0,
      $bgColHover: $B200,
      $fontColHover: $N0,
      $bgColActive: $B400,
      $fontColActive: $N0
    );
    @include button-focus-mixin($B100, 1);
  }

  &-primary-dark {
    @include btn-type-mixin(
      $bgCol: $B500,
      $fontCol: $N0,
      $bgColHover: $B300,
      $fontColHover: $N0,
      $bgColActive: $B400,
      $fontColActive: $N0
    );
    @include button-focus-mixin($B100, 1);
  }

  &-help {
    @include btn-type-mixin(
      $bgCol: $P500,
      $fontCol: $N0,
      $bgColHover: $P400,
      $fontColHover: $N0,
      $bgColActive: $P600,
      $fontColActive: $N0
    );
    @include button-focus-mixin($P100, 1);
  }

  &-help-light {
    @include btn-type-mixin(
      $bgCol: $P400,
      $fontCol: $N0,
      $bgColHover: $P300,
      $fontColHover: $N0,
      $bgColActive: $P300,
      $fontColActive: $N0
    );
    @include button-focus-mixin($P100, 1);
  }

  &-help-dark {
    @include btn-type-mixin(
      $bgCol: darken($P600, 5%),
      $fontCol: $N0,
      $bgColHover: $P400,
      $fontColHover: $N0,
      $bgColActive: $P600,
      $fontColActive: $N0
    );
    @include button-focus-mixin($P300, 1);
  }

  &-paleblue {
    @include btn-type-mixin(
      $bgCol: $PB300,
      $fontCol: $N0,
      $bgColHover: $PB200,
      $bgColActive: $PB400,
      $fontColHover: $N0,
      $fontColActive: $N0
    );
    @include button-focus-mixin($PB100, 1);
  }

  &-success {
    @include btn-type-mixin(
      $bgCol: $G400,
      $fontCol: $N0,
      $bgColHover: $G300,
      $fontColHover: $N0,
      $bgColActive: $G500,
      $fontColActive: $N0
    );
    @include button-focus-mixin($G300, 1);
  }

  &-info {
    @include btn-type-mixin(
      $bgCol: $T400,
      $fontCol: $N0,
      $bgColHover: $T300,
      $fontColHover: $N0,
      $bgColActive: $T500,
      $fontColActive: $N0
    );
    @include button-focus-mixin($T200, 1);
  }

  &-warning {
    @include btn-type-mixin(
      $bgCol: $Y400,
      $fontCol: $N900,
      $bgColHover: $Y300,
      $fontColHover: $N900,
      $bgColActive: $Y500,
      $fontColActive: $N900
    );
    @include button-focus-mixin(darken($Y500, 7%), 1);
  }

  &-danger {
    @include btn-type-mixin(
      $bgCol: $R400,
      $fontCol: $N0,
      $bgColHover: $R300,
      $fontColHover: $N0,
      $bgColActive: $R500,
      $fontColActive: $N0
    );
    @include button-focus-mixin($R100, 1);
  }

  &-subtle {
    @include btn-type-mixin(
      $bgCol: transparent,
      $fontCol: $N400,
      $bgColHover: $N30,
      $fontColHover: $N400,
      $bgColActive: $B50,
      $fontColActive: $B400
    );
    @include button-focus-mixin($B200, 1);
  }

  &-link {
    @include btn-type-mixin(
      $bgCol: transparent,
      $fontCol: $B400,
      $bgColHover: transparent,
      $fontColHover: $B300,
      $bgColActive: transparent,
      $fontColActive: $B500
    );

    &:hover {
      text-decoration: underline;
    }

    &:active,
    &:focus {
      text-decoration: none;
    }

    @include button-focus-mixin($B200, 1);
  }

  &-subtle-link {
    @include btn-type-mixin(
      $bgCol: transparent,
      $fontCol: $N100,
      $bgColHover: transparent,
      $fontColHover: $N80,
      $bgColActive: transparent,
      $fontColActive: $N400
    );

    &:hover {
      text-decoration: underline;
    }

    &:active,
    &:focus {
      text-decoration: none;
    }

    @include button-focus-mixin($B200, 1);
  }

  &-dark {
    @include btn-type-mixin(
      $bgCol: $N700,
      $fontCol: $N50,
      $bgColHover: $N500,
      $fontColHover: $N40,
      $bgColActive: $N800,
      $fontColActive: $N200
    );
    @include button-focus-mixin($N100, 1);
  }

  &-darker {
    @include btn-type-mixin(
      $bgCol: $N800,
      $fontCol: $N50,
      $bgColHover: $N500,
      $fontColHover: $N40,
      $bgColActive: $N700,
      $fontColActive: $N200
    );
    @include button-focus-mixin($N100, 1);
  }

  &-active {
    @include btn-type-mixin(
      $bgCol: $B50,
      $fontCol: $B400,
      $bgColHover: $B50,
      $fontColHover: $B400,
      $bgColActive: $B50,
      $fontColActive: $B400
    );
    @include button-focus-mixin($B100, 1);
  }

  &-black {
    @include btn-type-mixin(
      $bgCol: #18171b,
      $fontCol: $N200,
      $bgColHover: #18171b,
      $fontColHover: $N80,
      $bgColActive: #18171b,
      $fontColActive: $N400
    );
    @include button-focus-mixin($B100, 1);
  }
}

@mixin xs-button-size-mixin() {
  @include btn-size-mixin(
    $padding: 4px 8px,
    $fontSize: 12px,
    $lineHeight: 1.5em,
    $borderRadius: 4px
  );
  > div {
    min-width: 13px;
  }
  min-height: 26px;
}

@mixin sm-button-size-mixin() {
  @include btn-size-mixin(
    $padding: 1px 8px,
    $fontSize: 13px,
    $lineHeight: 2.2em,
    $borderRadius: 4px
  );
  > div {
    min-width: 15px;
  }
  min-height: 30px;
}

@mixin md-button-size-mixin() {
  @include btn-size-mixin(
    $padding: 0px 9px,
    $fontSize: 14px,
    $lineHeight: 2.3em,
    $borderRadius: 4px
  );
  > div {
    min-width: 17px;
  }
  min-height: 34px;
}

@mixin lg-button-size-mixin() {
  @include btn-size-mixin(
    $padding: 2px 15px,
    $fontSize: 17px,
    $lineHeight: 2.5em,
    $borderRadius: 4px
  );
  > div {
    min-width: 23px;
  }
  min-height: 45px;
}

@mixin btn-size-mixin($padding, $fontSize, $lineHeight, $borderRadius) {
  padding: $padding;
  font-size: $fontSize;
  line-height: $lineHeight;
  border-radius: $borderRadius;
}

.va-btn {
  border: none;
  outline: 0;
  margin: 0;
  text-align: center;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-family: inherit;
  text-decoration: none;
  vertical-align: middle;
  white-space: nowrap;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: background 0.1s ease-out,
    box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38);

  &:hover {
    text-decoration: none;
  }

  &:focus,
  &:active:focus,
  &-active:focus {
    outline: 0;
  }

  &:active {
    -webkit-transition-property: none;
    -moz-transition-property: none;
    -ms-transition-property: none;
    transition-property: none;
  }

  &-disabled {
    color: $N50 !important;
    cursor: not-allowed;
  }

  > div {
    > a {
      cursor: default;

      &:hover {
        text-decoration: none !important;
      }
    }
  }

  &-round {
    border-radius: 50% !important;
  }

  &-block {
    display: flex;
    width: 100%;
  }

  &-text-fade {
    position: relative;
    display: flex;
    align-items: center;
    transition: opacity 0.2s;
    opacity: 1;
    width: 100%;
    justify-content: space-around;

    &-out {
      opacity: 0;
    }
  }

  &-xs {
    @include xs-button-size-mixin();
  }

  &-sm {
    @include sm-button-size-mixin();
  }

  &-md {
    @include md-button-size-mixin();
  }

  &-lg {
    @include lg-button-size-mixin();
  }

  /**
  Styles applied to the loading spinner inside of the button element.
  All sizes defined here.
  */
  .va-page-loading-con {
    position: absolute;
  }

  &-xs {
    .va-page-loading-con {
      margin-top: 1px;

      svg {
        width: 16px !important;
      }
    }
  }

  &-sm {
    .va-page-loading-con {
      margin-top: 3px;

      svg {
        width: 18px !important;
      }
    }
  }

  &-md {
    .va-page-loading-con {
      margin-top: 4px;

      svg {
        width: 20px !important;
      }
    }
  }

  &-lg {
    .va-page-loading-con {
      margin-top: 6px;

      svg {
        width: 25px !important;
      }
    }
  }
}

/**
Styles applied to buttons that are wrapped in a <va-button-group>
are defined here.

Ready to be confused?
*/
.va-btn-group {
  position: relative;
  display: inline-block;
  vertical-align: middle;
}

.va-btn-group > .va-btn,
.va-btn-group > .va-dropdown-con {
  position: relative;
  float: left;
}

.va-btn-group {
  > .va-btn:not(:first-child):not(:last-child):not(.va-dropdown-toggle),
  > .va-dropdown-con:not(:first-child):not(:last-child):not(.va-dropdown-toggle) {
    border-radius: 0;
    margin-right: 1px;
  }

  > .va-btn:first-child {
    margin-left: 0;
  }

  > .va-btn:first-child:not(:last-child) {
    margin-right: 1px;
  }

  > .va-btn:first-child:not(:last-child):not(.va-dropdown-toggle),
  > .va-dropdown-con:first-child:not(:last-child):not(.va-dropdown-toggle)
    > span
    > div
    > .va-btn {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    margin-right: 1px;
  }

  > .va-dropdown-con:not(:first-child):not(:last-child)
    > span
    > div
    > .va-btn {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  > .va-btn:last-child:not(:first-child),
  > .va-dropdown-toggle:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  > .va-dropdown-con:not(:first-child) {
    > span > div > .va-btn {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  > .va-btn-group {
    float: left;
  }

  > .va-btn-group:not(:first-child):not(:last-child)
    > .va-btn {
    border-radius: 0;
  }

  > .va-btn-group:first-child:not(:last-child)
    > .va-btn:last-child,
  > .va-btn-group:first-child:not(:last-child)
    > .va-dropdown-toggle {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  > .va-btn-group:last-child:not(:first-child)
    > .va-btn:first-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}

/**
And, of course, when the button group is a vertical button group arrangement.
*/

.va-btn-group-vertical {
  position: relative;
  display: inline-flex !important;
  // display: flex;
  flex-direction: column;
  vertical-align: middle;
}

.va-btn-group-vertical > .va-btn {
  position: relative;
  float: left;
  width: 100%;
  display: flex;
}

.va-btn-group-vertical .va-btn {
  width: 100%;
}

.va-btn-group-vertical {
  > .va-btn:not(:first-child):not(:last-child):not(.va-dropdown-toggle),
  > .va-dropdown-con:not(:first-child):not(:last-child):not(.va-dropdown-toggle) {
    border-radius: 0;
    margin-bottom: 1px;
    margin-right: 0px;
  }

  > .va-btn:first-child {
    margin-top: 0;
  }

  > .va-btn:first-child:not(:last-child) {
    margin-bottom: 1px;
  }

  > .va-btn:first-child:not(:last-child):not(.va-dropdown-toggle) {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
  }

  > .va-btn:last-child:not(:first-child),
  > .va-dropdown-toggle:not(:first-child) {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  > .va-btn-group-vertical {
    float: left;
  }

  > .va-btn-group-vertical:not(:first-child):not(:last-child)
    > .va-btn {
    border-radius: 0;
  }

  > .va-btn-group-vertical:first-child:not(:last-child)
    > .va-btn:last-child,
  > .va-btn-group-vertical:first-child:not(:last-child)
    > .va-dropdown-toggle {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  > .va-btn-group-vertical:last-child:not(:first-child)
    > .va-btn:first-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>
