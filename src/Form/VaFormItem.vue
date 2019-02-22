<template>
  <div :class="classObj">
    <label
      v-if="label || inline || horizontal"
      v-bind="$attrs"
      :class="`${classPrefix}-col-sm-${label_col} ${classPrefix}-control-label`">
      {{label || '&nbsp;'}}
      <em :class="`${classPrefix}-form-need`" v-if="need">*</em>
    </label>
    <div :class="`${classPrefix}-col-sm-${col} ${classPrefix}-flex`">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VaFormItem',
  inheritAttrs: false,
  props: {
    label: {
      type: String
    },
    labelCol: {
      type: [Number, String],
      default: 0,
      required: false,
      note: 'Used in horizontal and vertical type forms to allow you to assign a number of columns to the item label.'
    },
    wrapCol: {
      type: Number
    },
    formCol: {
      type: Number
    },
    need: {
      type: Boolean,
      default: false,
      required: false,
      note: 'When true, all this does is render a red asterisk next to the label. This has nothing to do with validation.'
    },
    classPrefix: {
      type: String,
      default: 'va'
    }
  },
  data () {
    return {
      inline: false,
      vertical: false,
      horizontal: true
    }
  },
  created () {
    this.$on('Va@formTypeChange', (val) => {
      this.inline = (val === 'inline' ? true : false)
      this.vertical = (val === 'vertical' ? true : false)
      this.horizontal = (val === 'horizontal' ? true : false)
    })
  },
  computed: {
    label_col () {
      let lc = parseInt(this.labelCol)
      let defaultCol = this.inline ? 0 : 2
      defaultCol = this.vertical ? 12 : defaultCol
      return lc ? lc : defaultCol
    },
    col () {
      if (this.inline && !this.formCol) {
        return 0
      }

      if (this.formCol) {
        return this.formCol
      }

      let wrapCol = this.wrapCol ? this.wrapCol : 12
      return this.label_col == 12 ? 12 : wrapCol - this.label_col
    },
    classObj () {
      let {classPrefix} = this
      let classes = {}

      classes[classPrefix + '-form-group'] = true

      return classes
    }
  }
}
</script>
