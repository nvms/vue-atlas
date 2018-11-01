<template>
  <div :class="classObj">
    <div :class="`${prefixCls}-sidebar-navigationlevel-parent`">
      <div :class="`${prefixCls}-sidebar-group-item`">
        <va-sidebar-group-toggle :open="isOpen" @click.native="onToggleClick" v-if="st"/>
        <va-sidebar-group-item
          :item="parentItem"
          @click.native="onItemClick"
          :is-open="isOpen"
          :show-toggle="st" />
      </div>
    </div>
    <ul :class="`${prefixCls}-sidebar-navigationlevel-children`">
      <slot/>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'VaSidebarGroupLevel',
  props: {
    parentItem: {
      type: Object,
      required: true
    },
    level: {
      type: Number,
      required: true
    },
    open: {
      type: Boolean,
      required: false,
      default: false
    },
    showToggle: {
      type: Boolean,
      default: false
    },
    toggleType: {
      type: String,
      required: false,
      validator (v) {
        return [
          'arrow',
          'circle'
        ].includes(v)
      }
    },
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  data () {
    let s = this.showToggle
    return {
      st: s,
      isOpen: this.open
    }
  },
  created () {
    this.$on('Va@showToggleChange', (val) => {
      this.st = val
    })
  },
  computed: {
    classObj () {
      let {prefixCls, isOpen, level} = this
      let klass = {}

      klass[prefixCls + '-sidebar-navigationlevel'] = true
      klass[prefixCls + '-sidebar-navigationlevel-closed'] = !isOpen
      klass[prefixCls + '-sidebar-navigationlevel-open'] = isOpen
      klass[prefixCls + '-sidebar-navigationlevel-level-' + level] = true

      return klass
    }
  },
  methods: {
    onToggleClick () {
      this.isOpen = !this.isOpen
    },
    onItemClick () {
      if (this.isOpen === false) {
        this.isOpen = true
      }
    }
  }
}
</script>
