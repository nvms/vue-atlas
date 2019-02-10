<template>
  <div>
    <va-tooltip v-if="tooltip" :content="tooltip" placement="right" trigger="hover" effect="tooltip-fade-right" arrow>
      <div :class="classObj">
          <slot />
      </div>
    </va-tooltip>
    <div v-else :class="classObj">
      <slot />
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
      required: false,
      note: 'If true, this item will have a larger bottom margin so as to make a distinction between it and other items.'
    },
    tooltip: {
      type: String,
      default: '',
      required: false
    },
    classPrefix: {
      type: String,
      default: 'va'
    }
  },
  computed: {
    classObj () {
      let {classPrefix, brand} = this
      let classes = {}

      classes[classPrefix + '-minibar-item'] = true
      classes[classPrefix + '-minibar-item-brand'] = brand

      return classes
    }
  }
}
</script>
