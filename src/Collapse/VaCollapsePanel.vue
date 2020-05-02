<template>
  <div class="va-collapse__panel">
    <div class="va-collapse__panel__header" @click.stop.prevent="toggle($event)">
      <slot name="header" :is-open="isOpen">
        <va-icon v-if="!isOpen" type="angle-right"/>
        <va-icon v-else type="angle-down"/>
        {{header}}
      </slot>
    </div>
    <va-collapse-transition>
      <div class="va-collapse__panel__body" v-if="isOpen">
        <slot/>
      </div>
    </va-collapse-transition>
  </div>
</template>

<script>
export default {
  name: 'VaCollapsePanel',
  props: {
    header: {
      type: String
    },
    open: {
      type: Boolean,
      default: false
    },
    index: {},
    storeState: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const isOpen = this.open
    return {
      isOpen: isOpen
    }
  },
  computed: {
    storageKey () {
      return this.index ? this.name + '_' + this.index : this.name + '_' + this.header
    }
  },
  created () {
    if (this.storeState) {
      let storedValue = this.getStoredState()
      if (storedValue) {
        this.isOpen = (storedValue === 'open')
      }
    }
  },
  watch: {
    open (val) {
      this.isOpen = val
    },
    isOpen (val) {
      this.store(val)
    }
  },
  methods: {
    store (isOpen) {
      localStorage.setItem(this.storageKey, isOpen ? 'open' : 'closed')
    },
    getStoredState () {
      return localStorage.getItem(this.storageKey)
    },
    toggle () {
      this.isOpen = !this.isOpen

      const item = {
        index: this.index,
        header: this.header,
        isOpen: this.isOpen
      }

      this.$parent.change(this)
      this.$emit('change', item)
    }
  }
}
</script>
