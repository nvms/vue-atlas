<template>
  <div :class="['va-dropdown-con']" :style="styleObj">
    <va-input
      :custom-validate="customValidate"
      :disabled="disabled"
      :icon="icon"
      :icon-style="iconStyle"
      :name="name"
      :placeholder="placeholder"
      :readonly="readonly"
      :rules="rules"
      :clearable="clearable"
      :width="width"
      @blur="blur"
      @focus="focus"
      @input.native="update"
      @keydown.native.down="down"
      @keydown.native.enter="hit"
      @keydown.native.esc="onReset"
      @keydown.native.up="up"
      v-bind="$attrs"
      ref="input"
      no-v-model
      v-model="query"
    />

    <ul
      class="va-dropdown-menu"
      :style="{minWidth: actualWidth, maxHeight: dropdownHeight}"
      v-show="show"
      v-va-position="show"
    >
      <li :class="isActive(index)" :key="index" v-for="(item, index) in citems">
        <a @mousedown.prevent="hit(index)">
          <div class="inline">
            <slot :item="item" name="item">{{ item }}</slot>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import inputMixin from '../Mixin/inputMixin'

export default {
  name: 'VaTypeahead',
  mixins: [inputMixin],
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: ''
    },
    data: {
      type: Array
    },
    context: {},
    icon: {
      type: String,
      required: false
    },
    iconStyle: {
      type: String,
      default: 'regular',
      required: false
    },
    limit: {
      type: Number,
      default: 10
    },
    matchCase: {
      type: Boolean,
      default: false
    },
    debounce: {
      type: Number,
      default: 400
    },
    addFormat: {
      type: Function,
      default (item) {
        return item
      }
    },
    onHit: {
      type: Function,
      default (item) {
        this.reset()
        this.query = this.addFormat(item)
      }
    },
    clearable: {
      type: Boolean,
      default: false
    },
    dropdownWidth: {
      type: String,
      default: '100%'
    },
    dropdownHeight: {
      type: String,
      default: '300px'
    },
    async: {
      type: Boolean,
      default: true
    },
    items: {
      type: Array
    }
  },
  watch: {
    citems (val) {
      this.show = val && !!val.length
    },
    value (val) {
      this.query = val
    },
    query (val) {
      this.$emit('input', val)
      if (val.value === '') {
        this.items = []
      }
    }
  },
  data () {
    return {
      show: false,
      noResults: true,
      current: 0,
      query: this.value,
      timeoutID: 0
    }
  },
  computed: {
    styleObj () {
      const style = {}
      const { actualWidth } = this

      actualWidth.slice(-1) === '%'
        ? (style['width'] = actualWidth)
        : (style['min-width'] = actualWidth)

      return style
    },
    citems () {
      return this.items.slice(0, this.limit)
    },
    primitiveData () {
      if (this.data && this.query) {
        return this.data
          .filter(value => {
            value = this.matchCase ? value : value.toLowerCase()
            return value.indexOf(this.query) !== -1
          })
          .slice(0, this.limit)
      }

      return false
    }
  },
  methods: {
    focusInput () {
      this.$refs.input.focus()
    },
    focus () {
      this.$emit('focus')
    },
    blur () {
      this.show = false
      this.$emit('blur')
    },
    update () {
      clearTimeout(this.timeoutID)
      const self = this
      if (this.readonly || this.disabled) return
      this.timeoutID = setTimeout(() => {
        if (!self.query) {
          self.reset()
          return false
        }
        if (self.async) {
          self.$emit('change', self.query)
        }
      }, this.debounce)
    },
    reset () {
      this.query = ''
      this.loading = false
      this.show = false
    },
    isActive (index) {
      const classes = 'va-dropdown-active'
      return this.current === index ? classes : ''
    },
    hit (index) {
      if (this.citems && this.citems.length) {
        this.onHit(this.citems[index], this)
      }
    },
    up () {
      if (this.current > 0) this.current--
    },
    down () {
      if (this.current < this.citems.length - 1) this.current++
    }
  }
}
</script>
