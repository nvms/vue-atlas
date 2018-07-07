<template>
  <div :class="classObj" :style="{width:width + 'px'}">
    <textarea
      :class="`${prefixCls}-form-control`"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxLength"
      :style="styleObj"
      :name="name"
      @input="update($event.target.value)"
      @focus="_onFocus"
      @blur="_onBlur"
      :placeholder="placeholder"
      :value="value">
    </textarea>

    <validate
      :name="name"
      :rules="rules"
      :custom-validate="customValidate"
      :current="value">
    </validate>
  </div>
</template>

<script>
import validate from '../validate.vue'
import validationMixin from '../Mixin/validationMixin.js'

export default {
  name: 'VaTextarea',
  mixins: [validationMixin],
  props: {
    placeholder: {
      type: String,
      default: '',
      required: false
    },
    resize: {
      type: Boolean,
      default: true,
      required: false
    },
    width: {
      type: Number,
      default: 240,
      required: false
    },
    maxLength: {
      type: Number,
      required: false
    },
    maxHeight: {
      type: Number,
      required: false,
      default: 200
    },
    minHeight: {
      type: Number,
      required: false,
      default: 100
    },
    value: {
      type: String
    },
    readonly: {
      type: Boolean,
      default: false,
      required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  components: {
    validate
  },
  methods: {
    update (val) {
      this.$emit('input', val)
      this.$emit('change', val)
    },
    _onFocus () {
      this.$emit('focus')
    },
    _onBlur () {
      this.$emit('blur')
    }
  },
  computed: {
    styleObj () {
      let {resize, maxHeight, minHeight} = this
      let style = {}

      style['maxWidth'] = '100%'
      style['width'] = '100%'
      style['maxHeight'] = maxHeight + 'px'
      style['minHeight'] = minHeight + 'px'
      // style['minWidth'] = minWidth + 'px'
      // style['maxWidth'] = maxWidth + 'px'
      !resize ? style['resize'] = 'none' : ''

      return style
    },
    classObj () {
      let {prefixCls} = this
      let klass = {}

      klass[prefixCls + '-textarea-con'] = true
      // klass['inline'] = true

      return klass
    }
  }
}
</script>
