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
      :name="name"
      :class="inputClassObj"
      :style="{'width': width}"
      :readonly="readonly"
      :disabled="disabled"
      :placeholder="placeholder"
      :autofocus="autofocus"
      :type="type"
      @blur="blur"
      @input="update($event.target.value)"
      tabindex="0"
      v-on:keyup.enter="enterPressed"
      :value="value" />

    <va-icon
      v-if="showClean"
      type="times"
      icon-style="solid"
      :class="`${prefixCls}-input-show-clean`"
      @click.native.stop="clean">
    </va-icon>

    <va-icon
      v-if="icon !== undefined"
      :class="`${prefixCls}-input-show-icon`"
      :type="icon"
      :icon-style="iconStyle">
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
    value: {
      type: [String, Number]
    },
    size: {
      type: String
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
    iconStyle: {
      type: String,
      default: 'regular',
      required: false
    },
    showClean: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false,
      required: false
    },
    theme: {
      type: String,
      default: 'primary',
      required: false,
      validator (v) {
        return [
          'default',
          'primary',
          'success',
          'warning',
          'danger',
          'purple'
        ]
      }
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
    },
    inputClassObj () {
      let {prefixCls, theme} = this
      let klass = {}

      klass[prefixCls + '-form-control'] = true
      klass[prefixCls + '-form-control-' + theme] = true

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
    },
    enterPressed () {
      let el = this.$refs.input
      let evObj = document.createEvent('Events')
      evObj.initEvent('click', true, false)
      el.dispatchEvent(evObj)
    }
  }
}
</script>
