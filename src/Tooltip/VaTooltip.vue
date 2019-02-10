<template>
  <span ref="tooltip">
    <span ref="trigger">
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
      classes[classPrefix + '-tooltip-right'] = placement === 'right'
      classes[classPrefix + '-tooltip-bottom'] = placement === 'bottom'
      classes[classPrefix + '-tooltip-left'] = placement === 'left'

      return classes
    }
  }
}
</script>
