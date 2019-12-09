<template>
  <div :class="classObj">
    <div class="va-sidebar-navigationlevel-parent">
      <div class="va-sidebar-group-item">
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
    <ul class="va-sidebar-navigationlevel-children">
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
    }
  },
  data () {
    const s = this.showToggle
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
      const { isOpen, level } = this
      const classes = {}

      classes['va-sidebar-navigationlevel'] = true
      classes['va-sidebar-navigationlevel-closed'] = !isOpen
      classes['va-sidebar-navigationlevel-open'] = isOpen
      classes['va-sidebar-navigationlevel-level-' + level] = true

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
