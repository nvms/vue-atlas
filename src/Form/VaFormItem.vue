<template>
  <div :class="classObj">
    <label :class="`${prefixCls}-col-sm-${label_col} ${prefixCls}-control-label`">
      {{label}}
      <em :class="`${prefixCls}-form-need`" v-if="need">*</em>
    </label>
    <div :class="`${prefixCls}-col-sm-${col} inline`">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VaFormItem',
  props: {
    label: {
      type: String
    },
    labelCol: {
      type: Number,
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
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  computed: {
    inline () {
      return this.$parent.type === 'inline'
    },
    label_col () {
      let defaultCol = this.inline ? 0 : 2
      return this.labelCol ? this.labelCol : defaultCol
    },
    col () {
      if (this.inline && !this.formCol) {
        return 0
      }

      if (this.formCol) {
        return this.formCol
      }

      let wrapCol = this.wrapCol ? this.wrapCol : 12
      return wrapCol - this.label_col
    },
    classObj () {
      let {prefixCls, wrapCol} = this
      let klass = {}
      let defaultCol = this.inline ? (wrapCol || 0) : 12

      klass['clearfix'] = true
      klass[prefixCls + '-form-group'] = true
      klass[prefixCls + '-col-sm-' + defaultCol] = true

      return klass
    }
  }
}
</script>
