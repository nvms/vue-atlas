<template>
  <section v-show="isActive" :id="hash">
    <slot/>
  </section>
</template>

<script>
export default {
  name: 'VaTab',
  props: {
    id: {
      type: Number,
      default: null
    },
    name: {
      type: String,
      required: true
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isActive: false,
      isVisible: true
    }
  },
  computed: {
    header () {
      return this.name
    },
    hash () {
      if (this.isDisabled) {
        return '#'
      }

      return this.id
        ? '#' + this.id
        : '#' + this.name.toLowerCase().replace(/ /g, '-')
    }
  }
}
</script>
