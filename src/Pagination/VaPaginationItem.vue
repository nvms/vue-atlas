<template>
  <li :class="classObj">
    <va-button
      ref="button"
      :active="active"
      :disabled="disabled"
      type="subtle"
      @click.native="handleClick">
      <slot/>
    </va-button>
  </li>
</template>

<script>
export default {
  name: 'VaPaginationItem',
  props: {
    index: {
      type: Number
    },
    active: {
      default: false
    },
    disabled: {
      default: false
    },
    classPrefix: {
      type: String,
      required: false,
      default: 'va'
    }
  },
  methods: {
    handleClick () {
      if (!this.disabled) {
        this.$parent.changePage(this.index)
        this.$refs.button.focused = false
      }
    }
  },
  computed: {
    classObj () {
      let {disabled, classPrefix} = this
      let classes = {}

      classes[classPrefix + '-pagination-item-disabled'] = disabled

      return classes
    }
  }
}
</script>
