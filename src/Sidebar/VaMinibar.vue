<template>
  <div :class="classObj" :style="styleObj">

    <div :class="`${prefixCls}-minibar-top`">

      <div v-for="(item, index) in topItems" :key="index">
        <va-minibar-item v-if="item.method" :brand="item.brand" @click.native="item.method">
          <va-icon :type="item.icon" :size="item.size"></va-icon>
        </va-minibar-item>
        <va-minibar-item v-else :brand="item.brand">
          <va-icon :type="item.icon" :size="item.size"></va-icon>
        </va-minibar-item>
      </div>

    </div>

    <div :class="`${prefixCls}-minibar-bottom`">

      <div v-for="(item, index) in bottomItems" :key="index">
        <va-minibar-item v-if="item.method" @click.native="item.method">
          <va-icon :type="item.icon" :size="item.size"></va-icon>
        </va-minibar-item>
        <va-minibar-item v-else>
          <va-icon :type="item.icon" :size="item.size"></va-icon>
        </va-minibar-item>
      </div>

    </div>

  </div>
</template>

<script>
import events from '../utils/events'

export default {
  name: 'VaMinibar',
  mixins: [events],
  props: {
    topItems: {
      type: Array,
      required: false
    },
    bottomItems: {
      type: Array,
      required: false
    },
    theme: {
      type: String,
      default: 'default',
      required: false,
      validator (v) {
        return [
          'default',
          'white',
          'blue',
          'dark',
          'darker'
        ].includes(v)
      }
    },
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  data () {
    return {
      currentMinibarWidth: 64
    }
  },
  created () {
    this.$on('Va@minibarPresenceCheck', (val) => {
      this.dispatch('VaLayoutManager', 'Va@minibarPresenceReply', true)
    })
    this.$on('Va@minibarWidthChange', (val) => {
      this.currentMinibarWidth = val
    })
  },
  beforeDestroy () {
    this.dispatch('VaLayoutManager', 'Va@minibarDisconnect', true)
  },
  computed: {
    classObj () {
      let {prefixCls, theme} = this
      let klass = {}

      klass[prefixCls + '-minibar'] = true
      klass[prefixCls + '-minibar--theme-' + theme] = true

      return klass
    },
    styleObj () {
      let miniWidth = parseInt(this.currentMinibarWidth)
      let style = {}

      style['width'] = miniWidth + 'px'
      style['minWidth'] = miniWidth + 'px'

      return style
    }
  }
}
</script>
