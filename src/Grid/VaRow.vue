<template>
  <div :class="`${classPrefix}-row`" :style="styles">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VaRow',
  props: {
    gutter: {
      type: Number,
      default: 0
    },
    classPrefix: {
      type: String,
      default: 'va'
    }
  },
  computed: {
    styles () {
      let ret = {}
      let half = Math.floor(this.gutter / 2)
      ret.marginLeft = ret.marginRight = `${-half}px`
      this.$nextTick(() => {
        this.$children.forEach((children) => {
          children.$el.style.paddingLeft = children.$el.style.paddingRight = `${half}px`
          children.$el.style.marginBottom = this.gutter + 'px'
        })
      })
      return ret
    }
  }
}
</script>

<style lang="scss">
@function rem($pixels, $context: $browser-context) {
    @if (unitless($pixels)) {
        $pixels: $pixels * 1px;
    }

    @if (unitless($context)) {
        $context: $context * 1px;
    }
    @return ($pixels / $context) * 1rem;
}

$num-columns: 12;
$context: 16px;
$xs-min: 480px;
$sm-min: 768px;
$md-min: 960px;
$lg-min: 1280px;
// $xs-min: 320px;
// $sm-min: 480px;
// $md-min: 768px;
// $lg-min: 960px;
$sm-res: rem($sm-min, $context);
$md-res: rem($md-min, $context);
$lg-res: rem($lg-min, $context);
$sizes: (sm: $sm-res, md: $md-res, lg: $lg-res);
$gutter-width: rem(20px, $context);
$outer-margin: rem(16px, $context);
$half-gutter-width: $gutter-width / 2;

@mixin column($name, $num) {
  .#{$class-prefix}-col-#{$name}-#{$num} {
        box-sizing: border-box;
        flex: 0 0 auto;
        padding-right: $gutter-width * .5;
        padding-left: $gutter-width * .5;
        flex-basis: 100% / $num-columns * $num;
        max-width: 100% / $num-columns * $num;
    }
}

@mixin offset($name, $num) {
  .#{$class-prefix}-col-#{$name}-offset-#{$num} {
        margin-left: 100% / $num-columns * $num;
    }
}

@mixin container($width) {
  .#{$class-prefix}-container {
        box-sizing: border-box;
        width: $width;
        margin-right: auto;
        margin-left: auto;
        padding-left: $outer-margin;
        padding-right: $outer-margin;
    }
}

@mixin positions($size) {
    .#{$class-prefix}-start-#{$size} {
        justify-content: flex-start;
        text-align: start;
    }

    .#{$class-prefix}-center-#{$size} {
        justify-content: center;
        text-align: center;
    }

    .#{$class-prefix}-end-#{$size} {
        justify-content: flex-end;
        text-align: end;
    }

    .#{$class-prefix}-top-#{$size} {
        align-items: flex-start;
    }

    .#{$class-prefix}-middle-#{$size} {
        align-items: center;
    }

    .#{$class-prefix}-bottom-#{$size} {
        align-items: flex-end;
    }

    .#{$class-prefix}-around-#{$size} {
        justify-content: space-around;
    }

    .#{$class-prefix}-between-#{$size} {
        justify-content: space-between;
    }

    .#{$class-prefix}-first-#{$size} {
        order: -1;
    }

    .#{$class-prefix}-last-#{$size} {
        order: 1;
    }
}

@include container($xs-min);
@include positions('xs');

@for $i from 1 through $num-columns {
    @include column('xs', $i);
    @include offset('xs', $i);
}

@each $size, $res in $sizes {
    @media only screen and (min-width: $res) {
        @include container($res);
        @include positions($size);
        @for $i from 1 through $num-columns {
            @include column($size, $i);
            @include offset($size, $i);
        }
    }
}

.#{$class-prefix}-row {
    display: flex;
    flex-flow: row wrap;
    flex: 0 1 auto;
    // margin-left: $half-gutter-width * -1;
    // margin-right: $half-gutter-width * -1;
    margin-left: 0px;
    margin-right: 0px;
}
</style>