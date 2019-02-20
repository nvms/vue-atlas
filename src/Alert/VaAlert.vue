<template>
  <div :class="[`${classPrefix}-alert`, `${classPrefix}-alert-${type}`]">
    <div :class="`${classPrefix}-alert-${type}-icon`">
      <va-icon :type="iconType" :icon-style="iconStyle" />
    </div>
    <div>
      <h1 v-if="title">{{title}}</h1>
      <div><slot/></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VaAlert',
  props: {
    title: {
      type: String,
      required: false,
      note: 'The title to be rendered.'
    },
    type: {
      type: String,
      default: 'warning',
      required: false,
      validator (v) {
        return [
          'success',
          'info',
          'warning',
          'danger',
          'change'
        ].includes(v)
      },
      note: 'The type of alert to render.'
    },
    classPrefix: {
      type: String,
      default: 'va'
    }
  },
  computed: {
    iconType () {
      let {type} = this

      switch (type) {
        case 'success':
          return 'check-circle'
        case 'info':
          return 'info-circle'
        case 'warning':
          return 'exclamation-circle'
        case 'change':
          return 'question-circle'
        case 'danger':
          return 'exclamation-circle'
      }

      return 'info-circle'
    },
    iconStyle () {
      let {type} = this

      switch (type) {
        case 'success':
          return 'solid'
        case 'info':
          return 'solid'
        case 'warning':
          return 'solid'
        case 'change':
          return 'solid'
        case 'danger':
          return 'solid'
      }

      return 'solid'
    }
  }
}
</script>
