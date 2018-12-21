<template>
  <div :class="[show ? prefixCls + '-dropdown-con' : '']">

    <va-input
      ref="input"
      :width="width"
      :name="name"
      :rules="rules"
      :placeholder="placeholder"
      :custom-validate="customValidate"
      :readonly="readonly"
      :disabled="disabled"
      v-model="query"
      :show-clean="showClean"
      :icon="icon"
      :icon-style="iconStyle"
      @focus="focus"
      @blur="blur"
      @input.native="update"
      @keydown.native.up="up"
      @keydown.native.down="down"
      @keydown.native.enter="hit"
      @keydown.native.esc="onReset">
    </va-input>

    <ul
      :class="`${prefixCls}-dropdown-menu`"
      v-show="show"
      v-va-position="show"
      :style="{width: dropdownWidth, maxHeight: dropdownHeight}">
      <li v-for="(item, index) in citems" :class="isActive(index)" :key="index">
        <a @mousedown.prevent="hit(index)">
          <render
            :context="context || $parent._self"
            :template="itemRender(item)">
          </render>
        </a>
      </li>
    </ul>

  </div>
</template>

<script>
import render from '../render.vue'
import inputMixin from '../Mixin/inputMixin'

export default {
  name: 'VaTypeahead',
  created () {
    // this.citems = this.primitiveData
  },
  mixins: [inputMixin],
  props: {
    value: {
      type: String,
      default: ''
    },
    data: {
      type: Array
    },
    context: {
    },
    itemRender: {
      type: Function,
      default (item) {
        return item
      }
    },
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
    showClean: {
      type: Boolean,
      default: false
    },
    dropdownWidth: {
      type: String,
      default: '220px'
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
    },
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  watch: {
    items (val) {
      // this.citems = val
    },
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
      // citems: this.items
    }
  },
  computed: {
    citems () {
      return this.items.slice(0, this.limit)
    },
    primitiveData () {
      if (this.data && this.query) {
        return this.data.filter((value) => {
          value = this.matchCase ? value : value.toLowerCase()
          return value.indexOf(this.query) !== -1
        }).slice(0, this.limit)
      }
    }
  },
  components: {
    render
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
      let self = this
      if (this.readonly || this.disabled) return
      this.timeoutID = setTimeout(() => {
        if (!self.query) {
          self.reset()
          return false
        }
        if (self.async) {
          self.$emit('change', self.query)
        } else if (self.data) {
          // self.citems = self.primitiveData
        }
      }, this.debounce)
    },
    reset () {
      // this.citems = []
      this.query = ''
      this.loading = false
      this.show = false
    },
    isActive (index) {
      let klass = this.prefixCls + '-dropdown-active'
      return this.current === index ? klass : ''
    },
    hit (index) {
      if (this.citems && this.citems.length) {
        // index ? this.current = index : ''
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
