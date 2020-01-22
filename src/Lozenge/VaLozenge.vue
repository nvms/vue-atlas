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
          'help'
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
    }
  },
  computed: {
    classObj () {
      const { bold, type, size, uppercase, truncate } = this
      const classes = {}

      classes['va-lozenge'] = true
      classes['va-lozenge-bold'] = bold
      type ? (classes['va-lozenge-' + type] = true) : ''
      size ? (classes['va-lozenge-' + size] = true) : ''
      uppercase ? (classes['va-lozenge-uppercase'] = true) : ''
      truncate ? (classes['va-lozenge-truncate'] = true) : ''

      return classes
    }
  }
}
</script>

<style lang="scss" src="../style/_reset.scss" scoped></style>
<style lang="scss">
@import "../variables";

@mixin lozengeType($bgCol, $fontCol) {
  background-color: $bgCol;
  color: $fontCol;
}

.va-lozenge {
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  display: inline-block;
  padding: 3px 4px 3px;
  border-radius: 2px;
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
    border-radius: 2px;
    font-size: 10px;
  }
  &-lg {
    padding: 3px 4px 3px;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 500;
  }
  &.va-lozenge-default {
    @include lozengeType($bgCol: $N20, $fontCol: $N300);
    &.va-lozenge-bold {
      @include lozengeType($bgCol: $N500, $fontCol: $N20);
    }
  }
  &.va-lozenge-primary {
    @include lozengeType($bgCol: $B50, $fontCol: $B500);
    &.va-lozenge-bold {
      @include lozengeType($bgCol: $B400, $fontCol: $N20);
    }
  }
  &.va-lozenge-success {
    @include lozengeType($bgCol: $G50, $fontCol: $G500);
    &.va-lozenge-bold {
      @include lozengeType($bgCol: $G400, $fontCol: $N20);
    }
  }
  &.va-lozenge-warning {
    @include lozengeType($bgCol: $Y75, $fontCol: $N500);
    &.va-lozenge-bold {
      @include lozengeType($bgCol: $Y400, $fontCol: $N600);
    }
  }
  &.va-lozenge-help {
    @include lozengeType($bgCol: $P50, $fontCol: $P500);
    &.va-lozenge-bold {
      @include lozengeType($bgCol: $P400, $fontCol: $N20);
    }
  }
  &.va-lozenge-danger {
    @include lozengeType($bgCol: $R50, $fontCol: $R500);
    &.va-lozenge-bold {
      @include lozengeType($bgCol: $R400, $fontCol: $N20);
    }
  }
  &.va-lozenge-subtle {
    @include lozengeType($bgCol: $N0, $fontCol: $N500);
    &.va-lozenge-bold {
      @include lozengeType($bgCol: $N0, $fontCol: $N90);
    }
  }
}
</style>
