<template>
  <div :class="classObj">
    <div :class="headerClassObj" :style="headerStyleObj" v-if="hasHeaderData">
      <div class="va-card-header-inner">
        <div class="va-card-header-inner-left">
          <slot name="topLeft"/>
        </div>
        <div class="va-card-header-inner-right">
          <slot name="topRight"/>
        </div>
      </div>
    </div>
    <div :style="bodyStyleObj" class="va-card-body">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VaCard',
  props: {
    elevation: {
      type: [Number, String],
      default: 0,
      validator (v) {
        v = v.toString()
        return ['0', '1', '2', '3', '4', '5'].includes(v)
      }
    },
    padding: {
      type: [Number, String],
      default: '10px'
    }
  },
  computed: {
    classObj () {
      const { elevation } = this
      const classes = {}

      classes['va-card'] = true
      classes['va-card-elevation-' + elevation] = true

      return classes
    },
    bodyStyleObj () {
      const { padding } = this
      const style = {}

      style['padding'] = padding

      return style
    },
    headerClassObj () {
      const classes = {}

      classes['va-card-header'] = true

      return classes
    },
    headerStyleObj () {
      const { padding } = this
      const style = {}

      style['padding-left'] = padding
      style['padding-right'] = padding

      return style
    },
    hasHeaderData () {
      return this.$slots.topLeft || this.$slots.topRight
    }
  }
}
</script>

<style lang="scss" src="../style/_reset.scss" scoped></style>
<style lang="scss">
@import "../variables";

@mixin card-theme-mixin(
  $background,
  $headerBackground,
  $headerBorderBottom,
  $elevation0BoxShadow,
  $elevation0Border,
  $elevation1BoxShadow,
  $elevation1Border,
  $elevation2BoxShadow,
  $elevation2Border,
  $elevation3BoxShadow,
  $elevation3Border,
  $elevation4BoxShadow,
  $elevation4Border,
  $elevation5BoxShadow,
  $elevation5Border
) {
  background: $background;

  &-header {
    background: $headerBackground;
    border-bottom: $headerBorderBottom;
  }

  &-elevation-0 {
    box-shadow: $elevation0BoxShadow;
    border: $elevation0Border;
  }

  &-elevation-1 {
    box-shadow: $elevation1BoxShadow;
    border: $elevation1Border;
  }

  &-elevation-2 {
    box-shadow: $elevation2BoxShadow;
    border: $elevation2Border;
  }

  &-elevation-3 {
    box-shadow: $elevation3BoxShadow;
    border: $elevation3Border;
  }

  &-elevation-4 {
    box-shadow: $elevation4BoxShadow;
    border: $elevation4Border;
  }

  &-elevation-5 {
    box-shadow: $elevation5BoxShadow;
    border: $elevation5Border;
  }
}

.va-card,
.va--theme-light .va-card {
  @include card-theme-mixin(
    $background: $N0,
    $headerBackground: $N0,
    $headerBorderBottom: 1px solid $N40,
    $elevation0BoxShadow: none,
    $elevation0Border: none,
    $elevation1BoxShadow: none,
    $elevation1Border: 1px solid $N40,
    $elevation2BoxShadow: (
      0 2px 6px -2px rgba(9, 30, 66, 0.31),
      0 0 1px rgba(9, 30, 66, 0.31)
    ),
    $elevation2Border: none,
    $elevation3BoxShadow: (
      0 4px 8px -2px rgba(9, 30, 66, 0.31),
      0 0 1px rgba(9, 30, 66, 0.31)
    ),
    $elevation3Border: none,
    $elevation4BoxShadow: (
      0 6px 10px -2px rgba(9, 30, 66, 0.31),
      0 0 1px rgba(9, 30, 66, 0.31)
    ),
    $elevation4Border: none,
    $elevation5BoxShadow: (
      0 8px 12px -2px rgba(9, 30, 66, 0.31),
      0 0 1px rgba(9, 30, 66, 0.31)
    ),
    $elevation5Border: none
  );
}

.va-card {
  border-radius: 3px;

  &-header {
    display: flex;
    flex-direction: column;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    height: 44px;
    justify-content: center;

    &-inner {
      &-left {
        float: left;

        & > * {
          margin: 0;
          padding: 0;
        }
      }

      &-right {
        float: right;

        & > * {
          margin: 0;
          padding: 0;
        }
      }
    }
  }

  &-body {
    p:first-child {
      margin-top: 0;
    }
  }
}
</style>
