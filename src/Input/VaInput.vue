<template>
  <div :class="classObj" :style="{'width': width}">
    <!-- <input
      ref="input"
      auto-complete="off"
      :class="`${prefixCls}-form-control`"
      :style="{'width': width}"
      :readonly="readonly"
      :disabled="disabled"
      :placeholder="placeholder"
      :type="type"
      @blur="blur"
      @focus="focus"
      @input="update($event.target.value)"
      v-focus="focused"
      :value="value" /> -->

    <!-- This one has had the focus event and directive removed. -->
    <input
      ref="input"
      auto-complete="off"
      :class="`${prefixCls}-form-control`"
      :style="{'width': width}"
      :readonly="readonly"
      :disabled="disabled"
      :placeholder="placeholder"
      :type="type"
      @blur="blur"
      @input="update($event.target.value)"
      :value="value" />

    <va-icon
      type="times-circle"
      v-if="showClean"
      :class="`${prefixCls}-input-show-clean`"
      @click.native.stop="clean">
    </va-icon>

    <va-icon v-if="icon !== undefined"
      :class="`${prefixCls}-input-show-icon`"
      :type="icon">
    </va-icon>

    <validate
      :name="name"
      v-model="validStatus"
      :rules="rules"
      :custom-validate="customValidate"
      :current="value" />
  </div>
</template>

<script>
import inputMixin from '../Mixin/inputMixin'
import validate from '../validate.vue'
// import { focus } from 'vue-focus'

export default {
  name: 'VaInput',
  mixins: [inputMixin],
  props: {
    size: {
      type: String
    },
    value: {
      type: [String, Number]
    },
    onChange: {
      type: Function
    },
    prefixCls: {
      type: String,
      default: 'va'
    },
    type: {
      type: String,
      default: 'text'
    },
    icon: {
      type: String
    },
    showClean: {
      type: Boolean,
      default: false
    }
  },
  // directives: {
  //   focus: focus
  // },
  data () {
    return {
      focused: false
    }
  },
  components: {
    validate
  },
  computed: {
    classObj () {
      let {prefixCls, validStatus, showClean, size, icon} = this
      let klass = {}

      klass[prefixCls + '-has-error'] = validStatus === 'error'
      klass[prefixCls + '-has-success'] = validStatus === 'success'
      klass[prefixCls + '-has-warn'] = validStatus === 'warn'
      klass[prefixCls + '-input-con'] = true
      klass[prefixCls + '-show-clean'] = showClean
      klass[prefixCls + '-show-icon'] = icon ? true : false
      size ? klass[prefixCls + '-input-' + size] = true : ''
      klass['inline'] = true

      return klass
    }
  },
  methods: {
    clean () {
      this.$emit('input', '')
      this.$emit('clean')
    },
    update (val) {
      this.$emit('input', val)
      this.$emit('change', val)
    },
    blur () {
      this.focused = false
      this.$emit('blur', this.value)
    },
    focus () {
      this.focused = true
      this.$emit('focus', this.value)
    }
  }
}
</script>
