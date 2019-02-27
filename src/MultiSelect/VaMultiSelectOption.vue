<template>
  <li style="position:relative" class="va-mselect__menu-item">
    <a :class="classes" @click.prevent="selectOption(option)">
      <va-icon
        color="#5c7080"
        size="10px"
        type="check"
        v-show="isOptionSelected(option)"
      />
      <span class="va-mselect__menu-item-value">
        <span class="va-mselect__menu-item-value__text">
          <slot>{{ fullText }}</slot>
        </span>
        <span class="va-mselect__menu-item-value__label">
          {{label}}
        </span>
      </span>
    </a>
  </li>
</template>

<script>
export default {
  name: 'VaMultiSelectOption',
  inject: ['addSelectOption', 'isOptionSelected', 'selectOption'],
  props: {
    value: {},
    text: {
      type: String,
      required: false
    },
    label: {
      type: String,
      required: false
    }
  },
  computed: {
    fullText () {
      return this.text // || this.value
    },
    option () {
      return { label: this.fullText, value: this.value }
    },
    classes () {
      let classes = {}

      classes['va-mselect__menu-item__anchor'] = true
      classes['va-mselect__menu-item--active'] = this.isOptionSelected(
        this.option
      )

      return classes
    }
  },
  mounted () {
    this.addSelectOption(this.value, this.fullText)
  }
}
</script>
