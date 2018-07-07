<template>
  <div :class="classObj" >
    <va-button
      :style="{width:width}"
      :disabled="disabled"
      :size="size"
      :class="[`${prefixCls}-dropdown-toggle`,
               `${prefixCls}-select-btn`,
               showSelected && multiple && value.length ? `${prefixCls}-select-multiple` : '',
               show ? `${prefixCls}-select-btn-open` : '']"
      @click.native="toggleDropdown">
      <span v-if="showPlaceholder || !showSelected" :class="`${prefixCls}-select-placeholder`">{{placeholder}}</span>
        <span v-if="showSelected" style="display: flex;">
          <template v-for="(item, index) in selectedItems" v-if="multiple">
            <!-- eslint-disable-next-line -->
            <render
              :key="index"
              @click.native.prevent.stop="del(item)"
              :class="`${prefixCls}-selected-tag`"
              :context="context || $parent._self"
              :template="format(item)">
            </render>
          </template>
          <template v-else>
            <render :context="context || $parent._self" :template="format(selectedItems[0])"></render>
          </template>
        </span>
      &nbsp;&nbsp;
      <va-icon :type="show ? 'angle-up' : 'angle-down'" ></va-icon>
    </va-button>
    <transition name="fadeDown">
      <ul
        :style="{maxHeight: menuMaxHeight + 'px', width: menuWidth + 'px'}"
        :class="`${prefixCls}-dropdown-menu`"
        ref="menu"
        v-va-position="show"
        v-show="show">
          <li v-if="search">
            <input
              :class="`${prefixCls}-select-search`"
              :placeholder="inputPlaceholder"
              v-model="searchText"
              @keydown.native.enter="addExtra" />

            <va-icon type="plus-square-o" v-if="extra" @click.native="addExtra"></va-icon>
          </li>
          <li v-if="multiple" :class="`${prefixCls}-select-all`">
            <a @click.prevent="selectAll">
              {{getL('all')}}
             <va-icon type="check-square" color="#0052CC" v-show="allSelected"></va-icon>
            </a>
          </li>

          <template v-if="currentOptions.length">
            <!-- eslint-disable-next-line -->
            <li v-for="(option, index) in filterOptions"
                :key="index"
                :value="option.value"
                style="position:relative">
              <a @click.prevent="select(option)">
                <span v-html="option.label"></span>
                <va-icon type="check-square" color="#0052CC" v-show="findIndex(option.value) !== -1"></va-icon>
              </a>
            </li>
          </template>
          <slot v-else ></slot>
        <div :class="`${prefixCls}-notify`" v-show="showNotify" transition="fadeDown">Limit: {{limit}}</div>
      </ul>
    </transition>
    <div class="clearfix"></div>
    <validate
      :name="name"
      v-model="validStatus"
      :rules="rules"
      :custom-validate="customValidate"
      :current="value">
    </validate>
  </div>
</template>

<script>
import EventListener from '../utils/EventListener'
import validationMixin from '../Mixin/validationMixin'
import render from '../render.vue'
import validate from '../validate.vue'
import type from '../utils/type'
import localeMixin from '../Mixin/localeMixin.js'

export default {
  name: 'VaSelect',
  mixins: [validationMixin, localeMixin('VaSelect')],
  props: {
    readonly: {
      type: Boolean,
      default: false,
      required: false,
      note: 'Whether or not the select dropdown is readonly.'
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false,
      note: 'Whether or not the select dropdown is disabled.'
    },
    showSelected: {
      type: Boolean,
      default: true,
      required: false,
      note: 'When this is false, selected items do not appear in the main select input element.'
    },
    inputPlaceholder: {
      type: String,
      default: '',
      required: false,
      note: 'If the \'search\' prop is passed, the inputPlaceholder prop allows you to specify a placeholder for the input that appears at the top of the dropdown list.'
    },
    size: {
      type: String,
      required: false,
      note: 'The size of the select input.'
    },
    context: {

    },
    type: {
      type: String,
      default: 'success'
    },
    options: {
      type: Array,
      default () {
        return []
      },
      required: false,
      note: 'Accepts an array of objects with value and label keys: { value: \'apple\', label: \'Apple\' }'
    },
    value: {
    },
    placeholder: {
      type: String,
      default: '',
      required: false,
      note: 'The placeholder for the select input.'
    },
    multiple: {
      type: Boolean,
      default: false,
      required: false,
      note: 'When true, multiple items can be selected at the same time.'
    },
    search: {
      type: Boolean,
      default: false,
      required: false,
      note: 'When true, a search input appears at the top of the item list. Items can be filtered using this search input.'
    },
    extra: {
      type: Boolean,
      default: false,
      required: false,
      note: 'When true, an input element will appear at the top of the item list. New items can be created using this input.'
    },
    limit: {
      type: Number,
      default: 1024,
      required: false,
      note: 'Allows you to set a maximum number of selected items.'
    },
    width: {
      type: String
    },
    menuMaxHeight: {
      type: Number,
      default: 300,
      required: false,
      note: 'The maximum height of the dropdown menu.'
    },
    menuWidth: {
      type: Number,
      required: false
    },
    matchCase: {
      type: Boolean,
      default: false,
      required: false,
      note: 'When true, searches are case-sensitive.'
    },
    format: {
      type: Function,
      default (item) {
        if (!item) item = { label: '' }
        return item.label
      }
    },
    noUncheck: {
      type: Boolean,
      default: false,
      required: false,
      note: 'When true, you cannot uncheck a checked element in a single select component.'
    },
    customValidate: {
      type: Function
    },
    rules: {
      type: Array
    },
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  data () {
    return {
      validStatus: '',
      searchText: '',
      show: false,
      showNotify: false,
      currentValue: this.value,
      currentOptions: this.options
    }
  },
  watch: {
    value (val) {
      if (this.inner) {
        this.inner = false
        return
      }
      this.inner = true
      this.currentValue = val
    },
    options (val) {
      this.currentOptions = val
    },
    currentValue (val) {
      if (this.inner) {
        this.inner = false
        return
      }
      this.inner = true
      this.$emit('input', val)
      this.$emit('change', val)
    },
    multiple (val) {
      if (val === false) {
        if (Array.isArray(this.value) && this.value.length > 1) {
          this.value = this.value[0]
        }
      }
    }
  },
  components: {
    render,
    validate
  },
  computed: {
    classObj () {
      let {prefixCls, validStatus} = this
      let klass = {}

      klass[prefixCls + '-has-error'] = validStatus === 'error'
      klass[prefixCls + '-has-success'] = validStatus === 'success'
      klass[prefixCls + '-has-warn'] = validStatus === 'warn'

      klass[prefixCls + '-btn-group'] = true
      klass[prefixCls + '-select-group'] = true
      klass[prefixCls + '-dropdown-con'] = true

      return klass
    },
    filterOptions () {
      return this.filter(this.currentOptions, this.searchText)
    },
    valueArray: {
      get () {
        var a
        if (type.isArray(this.currentValue)) {
          a = this.currentValue
        } else {
          a = [this.currentValue]
        }
        return this.findInOptions(a)
      },
      set (value) {
        let self = this
        if (this.multiple) {
          let ret = []
          for (let i = 0; i < value.length; i++) {
            ret.push(value[i].value)
          }
          let timeout
          if (timeout) clearTimeout(timeout)
          if (ret.length > this.limit) {
            this.showNotify = true
            this.remove(value, this.limit)
            timeout = setTimeout(() => {
              self.showNotify = false
            }, 1000)
          } else {
            this.currentValue = ret
          }
        } else {
          this.currentValue = value[0] ? value[0].value : ''
        }
      }
    },
    allSelected () {
      var options = this.filter(this.currentOptions, this.searchText)
      var values = this.currentValue

      if (!values || options.length !== values.length || options.length === 0) {
        return false
      }

      for (var i = 0, l = options.length; i < l; i++) {
        var value = options[i].value
        if (values.indexOf(value) === -1) {
          return false
        }
      }
      return true
    },
    selectedItems () {
      var ret = []
      var a = this.valueArray

      for (var i = 0; i < a.length; i++) {
        ret.push(a[i])
      }
      return ret
    },
    showPlaceholder () {
      if (type.isArray(this.currentValue)) {
        return this.currentValue.length <= 0
      } else {
        return type.isNullOrUndefined(this.currentValue) || this.currentValue === ''
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (!this.currentOptions.length) {
        var options = this.$refs.menu.querySelectorAll('.' + this.prefixCls + '-option')
        var ret = []

        for (var i = 0, l = options.length; i < l; i++) {
          var value = options[i].getAttribute('value')
          var label = options[i].innerHTML

          ret.push({value: value, label: label})
        }
        this.currentOptions = ret
      }
      this._closeEvent = EventListener.listen(window, 'click', (e) => {
        if (!this.$el.contains(e.target)) this.show = false
      })
    })
  },
  beforeDestroy () {
    if (this._closeEvent) this._closeEvent.remove()
  },
  methods: {
    filter (value, search) {
      if (search === '') return value
      var ret = []
      for (var i = 0, l = value.length; i < l; i++) {
        var v = value[i] && String(value[i].label).replace(/<.*?>/g, '')
        var s = search

        if (!this.matchCase) {
          v = v.toLocaleLowerCase()
          s = s.toLocaleLowerCase()
        }

        if (v !== '' && v.indexOf(s) > -1) {
          ret.push(value[i])
        }
      }
      return ret
    },
    selectAll () {
      if (this.allSelected) {
        this.valueArray = []
      } else {
        this.valueArray = this.filter(this.currentOptions, this.searchText)
      }
    },
    addExtra () {
      if (this.extra && this.searchText.replace(/\s+$|^\s+/g, '')) {
        this.currentOptions.push({value: this.searchText, label: this.searchText})
        this.add({value: this.searchText, label: this.searchText})
        this.searchText = ''
      }
    },
    findInOptions (a) {
      var options = this.currentOptions
      var ret = []

      for (var i = 0; i < a.length; i++) {
        var s = this.find(a[i], options)
        s != null ? ret.push(s) : 0
      }
      return ret
    },
    find (v, array) {
      var a = array || this.valueArray
      for (var i = 0; i < a.length; i++) {
        if (v === a[i].value) {
          return a[i]
        }
      }
      return null
    },
    findIndex (v, array) {
      var a = array || this.valueArray
      for (var i = 0; i < a.length; i++) {
        if (v === a[i].value) {
          return i
        }
      }
      return -1
    },
    add (option) {
      var a = this.valueArray.slice(0)
      if (this.multiple) {
        a.push(option)
      } else {
        a = [option]
      }
      this.valueArray = a
    },
    del (item) {
      var index = this.findIndex(item.value)
      this.remove(this.valueArray, index, 1)
    },
    remove (array, index, num) {
      var a = array.slice(0)
      num ? a.splice(index, num) : a.splice(index)
      this.valueArray = a
    },
    select (option) {
      var index = this.findIndex(option.value)
      if (this.multiple) {
        index === -1 ? this.add(option) : this.remove(this.valueArray, index, 1)
      } else {
        index === -1 ? this.valueArray = [option] : this.noUncheck ? this.valueArray = [option] : this.valueArray = []
        this.show = false
      }
    },
    toggleDropdown () {
      if (!this.disabled && !this.readonly) {
        this.show = !this.show
      }
    }
  }
}
</script>
