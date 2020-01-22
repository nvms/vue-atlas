<template>
  <div>
    <va-tooltip
      v-if="tooltip"
      :content="tooltip"
      placement="right"
      trigger="hover"
      effect="tooltip-fade-right"
      arrow
    >
      <div :class="classObj">
        <slot/>
      </div>
    </va-tooltip>
    <div v-else :class="classObj">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VaMinibarItem',
  props: {
    brand: {
      type: Boolean,
      default: false,
      required: false
    },
    tooltip: {
      type: String,
      default: '',
      required: false
    }
  },
  computed: {
    classObj () {
      const { brand } = this
      const classes = {}

      classes['va-minibar-item'] = true
      classes['va-minibar-item-brand'] = brand

      return classes
    }
  }
}
</script>
