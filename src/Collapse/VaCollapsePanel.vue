<template>
  <div class="va-collapse__panel">
    <div class="va-collapse__panel__header" @click="toggle()">
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
    index: {}
  },
  data () {
    const isOpen = this.open
    return {
      isOpen: isOpen
    }
  },
  watch: {
    open (val) {
      this.isOpen = val
    }
  },
  methods: {
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
