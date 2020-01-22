<template>
  <div class="va-collapse">
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
    }
  },
  methods: {
    change (child) {
      // eslint-disable-next-line
      let items = []

      if (this.accordion) {
        this.$children.forEach(item => {
          if (child !== item) {
            item.isOpen = false
          }
        })
      }

      this.$children.forEach(item => {
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

<style lang="scss" src="../style/_reset.scss" scoped></style>
<style lang="scss">
@import "../variables";

.va-collapse {
  &__panel {
    &__header {
      color: $N400;
      padding: 2px 10px;
      border-radius: 3px;
      cursor: pointer;
      transition: background 0.2s ease-out;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

      i {
        width: 15px;
      }

      &:hover,
      &:active {
        outline: none;
      }

      &:hover {
        background: $N20;
      }

      &:active {
        background-color: $B50;
        color: $B500;
      }
    }

    &__body {
      padding: 0 0 0 30px;
    }
  }
}
</style>
