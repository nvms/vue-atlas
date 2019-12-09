<template>
  <li style="position:relative">
    <a :class="classes" @click.prevent="selectOption(option)">
      <slot>{{ fullLabel }}</slot>
    </a>
  </li>
</template>

<script>
export default {
  name: 'VaOption',
  inject: ['addSelectOption', 'isOptionSelected', 'selectOption'],
  props: {
    value: {},
    label: {
      type: String,
      required: false
    }
  },
  computed: {
    fullLabel () {
      return this.label || this.value
    },
    option () {
      return { label: this.fullLabel, value: this.value }
    },
    classes () {
      const classes = {}

      classes['va-select-item-active'] = this.isOptionSelected(
        this.option
      )

      return classes
    }
  },
  mounted () {
    this.addSelectOption(this.value, this.fullLabel)
  }
}
</script>
