<template>
  <span :class="classObj">
    <slot/>
  </span>
</template>

<script>
export default {
  name: 'VaLozenge',
  props: {
    type: {
      type: String,
      required: false,
      default: 'default',
      validator (v) {
        return [
          'default',
          'primary',
          'success',
          'warning',
          'danger',
          'subtle',
          'purple'
        ].includes(v)
      }
    },
    bold: {
      type: Boolean,
      required: false,
      default: false
    },
    uppercase: {
      type: Boolean,
      required: false,
      default: false
    },
    truncate: {
      type: Boolean,
      required: false,
      default: false
    },
    size: {
      type: String,
      required: false,
      validator (v) {
        return ['lg', 'sm'].includes(v)
      }
    },
    classPrefix: {
      type: String,
      required: false,
      default: 'va'
    }
  },
  computed: {
    classObj () {
      let { classPrefix, bold, type, size, uppercase, truncate } = this
      let classes = {}

      classes[classPrefix + '-lozenge'] = true
      classes[classPrefix + '-lozenge-bold'] = bold
      type ? (classes[classPrefix + '-lozenge-' + type] = true) : ''
      size ? (classes[classPrefix + '-lozenge-' + size] = true) : ''
      uppercase ? (classes[classPrefix + '-lozenge-uppercase'] = true) : ''
      truncate ? (classes[classPrefix + '-lozenge-truncate'] = true) : ''

      return classes
    }
  }
}
</script>

<style lang="scss">
@mixin lozengeType($bgCol, $fontCol) {
  background-color: $bgCol;
  color: $fontCol;
}

.#{$class-prefix}-lozenge {
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  display: inline-block;
  padding: 3px 4px 3px;
  border-radius: 3px;
  overflow: hidden;
  vertical-align: sub;

  &-truncate {
    max-width: 180px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &-uppercase {
    text-transform: uppercase;
  }
  &-sm {
    padding: 2px 3px 2px;
    border-radius: 3px;
    font-size: 10px;
  }
  &-lg {
    padding: 3px 4px 3px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
  }
  &.#{$class-prefix}-lozenge-default {
    @include lozengeType($bgCol: $N20, $fontCol: $N300);
    &.#{$class-prefix}-lozenge-bold {
      @include lozengeType($bgCol: $N500, $fontCol: $N20);
    }
  }
  &.#{$class-prefix}-lozenge-primary {
    @include lozengeType($bgCol: $B50, $fontCol: $B500);
    &.#{$class-prefix}-lozenge-bold {
      @include lozengeType($bgCol: $B400, $fontCol: $N20);
    }
  }
  &.#{$class-prefix}-lozenge-success {
    @include lozengeType($bgCol: $G50, $fontCol: $G500);
    &.#{$class-prefix}-lozenge-bold {
      @include lozengeType($bgCol: $G400, $fontCol: $N20);
    }
  }
  &.#{$class-prefix}-lozenge-warning {
    @include lozengeType($bgCol: $Y75, $fontCol: $N500);
    &.#{$class-prefix}-lozenge-bold {
      @include lozengeType($bgCol: $Y400, $fontCol: $N600);
    }
  }
  &.#{$class-prefix}-lozenge-purple {
    @include lozengeType($bgCol: $P50, $fontCol: $P500);
    &.#{$class-prefix}-lozenge-bold {
      @include lozengeType($bgCol: $P400, $fontCol: $N20);
    }
  }
  &.#{$class-prefix}-lozenge-danger {
    @include lozengeType($bgCol: $R50, $fontCol: $R500);
    &.#{$class-prefix}-lozenge-bold {
      @include lozengeType($bgCol: $R400, $fontCol: $N20);
    }
  }
  &.#{$class-prefix}-lozenge-subtle {
    @include lozengeType($bgCol: $N0, $fontCol: $N500);
    &.#{$class-prefix}-lozenge-bold {
      @include lozengeType($bgCol: $N0, $fontCol: $N90);
    }
  }
}
</style>
