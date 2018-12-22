<template>
  <span ref="tooltip">
    <span ref="trigger">
      <slot />
    </span>
    <transition :name="effect">
      <div :class="classObj" ref="popover" v-show="isShow">
        <div v-if="arrow" :class="`${prefixCls}-tooltip-arrow`"></div>
        <div :class="`${prefixCls}-tooltip-inner`">
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
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  mixins: [PopoverMixin],
  computed: {
    classObj () {
      let {prefixCls, placement} = this
      let klass = {}

      klass[prefixCls + '-tooltip'] = true
      klass[prefixCls + '-tooltip-top'] = placement === 'top'
      klass[prefixCls + '-tooltip-right'] = placement === 'right'
      klass[prefixCls + '-tooltip-bottom'] = placement === 'bottom'
      klass[prefixCls + '-tooltip-left'] = placement === 'left'

      return klass
    }
  }
}
</script>
