<template>
  <div :class="`${classPrefix}-collapse`">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'VaCollapse',
  props: {
    accordion: {
      type: Boolean,
      default: false
    },
    classPrefix: {
      type: String,
      default: 'va'
    }
  },
  methods: {
    change (child) {
      let items = []

      if (this.accordion) {
        this.$children.forEach((item) => {
          if (child !== item) {
            item.isOpen = false
          }
        })
      }

      this.$children.forEach((item) => {
        if (item.index) {
          items.push({
            index: item.index,
            isOpen: item.isOpen,
            header: item.header
          })
        }
      })

      this.$emit('change', items)
    }
  }
}
</script>
