<template>
  <span ref="tooltip" :class="`${classPrefix}-tooltip_wrapper`">
    <span
      ref="trigger"
      :class="`${classPrefix}-tooltip_trigger`"
      v-on="listeners"
    >
      <slot/>
    </span>
    <transition :name="effect">
      <div :class="classObj" ref="popover" v-show="isShow">
        <div v-if="arrow" :class="`${classPrefix}-tooltip-arrow`"></div>
        <div :class="`${classPrefix}-tooltip-inner`">
          <span v-html="content"></span>
        </div>
      </div>
    </transition>
  </span>
</template>

<script>
import PopoverMixin from '../Mixin/popoverMixin'

export default {
  name: 'VaTooltip',
  props: {
    arrow: {
      type: Boolean,
      default: false
    },
    effect: {
      type: String,
      default: 'tooltip-fade-top' // tooltip-fade-top, -left, -right, -bottom
    },
    classPrefix: {
      type: String,
      default: 'va'
    }
  },
  mixins: [PopoverMixin],
  computed: {
    classObj () {
      let { classPrefix, placement } = this
      let classes = {}

      classes[classPrefix + '-tooltip'] = true
      classes[classPrefix + '-tooltip-top'] = placement === 'top'
      classes[classPrefix + '-tooltip-top-left'] = placement === 'top left'
      classes[classPrefix + '-tooltip-top-right'] = placement === 'top right'
      classes[classPrefix + '-tooltip-right'] = placement === 'right'
      classes[classPrefix + '-tooltip-right-top'] = placement === 'right top'
      classes[classPrefix + '-tooltip-right-bottom'] =
        placement === 'right bottom'
      classes[classPrefix + '-tooltip-bottom'] = placement === 'bottom'
      classes[classPrefix + '-tooltip-bottom-left'] =
        placement === 'bottom left'
      classes[classPrefix + '-tooltip-bottom-right'] =
        placement === 'bottom right'
      classes[classPrefix + '-tooltip-left'] = placement === 'left'
      classes[classPrefix + '-tooltip-left-top'] = placement === 'left top'
      classes[classPrefix + '-tooltip-left-bottom'] =
        placement === 'left bottom'

      return classes
    }
  }
}
</script>

<style lang="scss" scoped>
.#{$class-prefix}-tooltip_wrapper,
.#{$class-prefix}-tooltip_trigger {
  display: inline-block;
  width: auto;
  height: auto;
}
.#{$class-prefix}-tooltip {
  position: absolute;
  z-index: 1010;
  display: block;
  font-size: 12px;
  font-weight: normal;
  line-height: 1.4;
  visibility: visible;
  background-color: $N800;
  color: $N0;
  padding: 2px 6px;
  border-radius: 3px;
  line-height: 1.3;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: nowrap;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  &-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
  }
  &-top,
  &-top-left,
  &-top-right {
    margin-top: -5px;
  }
  &-bottom,
  &-bottom-left,
  &-bottom-right {
    margin-top: 5px;
  }
  &-left,
  &-left-top,
  &-left-bottom {
    margin-left: -5px;
    .#{$class-prefix}-tooltip-arrow {
      top: 50%;
      right: -5px;
      margin-top: -5px;
      border-width: 5px 0 5px 5px;
      border-left-color: $N800;
    }
  }
  &-right,
  &-right-top,
  &-right-bottom {
    margin-left: 5px;
    .#{$class-prefix}-tooltip-arrow {
      top: 50%;
      left: -5px;
      margin-top: -5px;
      border-width: 5px 5px 5px 0;
      border-right-color: $N800;
    }
  }
}
</style>
