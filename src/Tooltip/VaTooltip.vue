<template>
  <span ref="tooltip" class="va-tooltip_wrapper">
    <span ref="trigger" class="va-tooltip_trigger" v-on="listeners">
      <slot />
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
      let {classPrefix, placement} = this
      let classes = {}

      classes[classPrefix + '-tooltip'] = true
      classes[classPrefix + '-tooltip-top'] = placement === 'top'
      classes[classPrefix + '-tooltip-top-left'] = placement === 'top left'
      classes[classPrefix + '-tooltip-top-right'] = placement === 'top right'
      classes[classPrefix + '-tooltip-right'] = placement === 'right'
      classes[classPrefix + '-tooltip-right-top'] = placement === 'right top'
      classes[classPrefix + '-tooltip-right-bottom'] = placement === 'right bottom'
      classes[classPrefix + '-tooltip-bottom'] = placement === 'bottom'
      classes[classPrefix + '-tooltip-bottom-left'] = placement === 'bottom left'
      classes[classPrefix + '-tooltip-bottom-right'] = placement === 'bottom right'
      classes[classPrefix + '-tooltip-left'] = placement === 'left'
      classes[classPrefix + '-tooltip-left-top'] = placement === 'left top'
      classes[classPrefix + '-tooltip-left-bottom'] = placement === 'left bottom'

      return classes
    }
  }
}
</script>
<style scoped>
    .va-tooltip_wrapper, .va-tooltip_trigger {
        display: inline-block;
        width: auto;
        height: auto;
    }
</style>
