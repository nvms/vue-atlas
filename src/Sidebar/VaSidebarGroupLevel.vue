<template>
  <div :class="classObj">
    <div :class="`${classPrefix}-sidebar-navigationlevel-parent`">
      <div :class="`${classPrefix}-sidebar-group-item`">
        <va-sidebar-group-toggle
          :open="isOpen"
          @click.native="onToggleClick"
          v-if="st"
        />
        <va-sidebar-group-item
          :item="parentItem"
          @click.native="onItemClick"
          :is-open="isOpen"
          :show-toggle="st"
        />
      </div>
    </div>
    <ul :class="`${classPrefix}-sidebar-navigationlevel-children`">
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
        return ['arrow', 'circle'].includes(v)
      }
    },
    classPrefix: {
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
    this.$on('Va@showToggleChange', val => {
      this.st = val
    })
  },
  computed: {
    classObj () {
      let { classPrefix, isOpen, level } = this
      let classes = {}

      classes[classPrefix + '-sidebar-navigationlevel'] = true
      classes[classPrefix + '-sidebar-navigationlevel-closed'] = !isOpen
      classes[classPrefix + '-sidebar-navigationlevel-open'] = isOpen
      classes[classPrefix + '-sidebar-navigationlevel-level-' + level] = true

      return classes
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
