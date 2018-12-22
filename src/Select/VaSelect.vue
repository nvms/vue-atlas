<template>
    <div :class="classObj">
        <va-button
                :class="[`${prefixCls}-dropdown-toggle`, `${prefixCls}-select-btn`, showSelected && multiple && value.length ? `${prefixCls}-select-multiple` : '', show ? `${prefixCls}-select-btn-open` : '']"
                :disabled="disabled"
                :size="size"
                :style="{width:width}"
                :type="type"
                @click.native="toggleDropdown"
                ref="button">
            <span :class="`${prefixCls}-select-placeholder`"
                  v-if="showPlaceholder || !showSelected">{{placeholder}}</span>
            <span style="display: flex;" v-if="showSelected">
          <template v-if="multiple">
            <div :class="`${prefixCls}-selected-tag`"
                 :key="index"
                 @click.stop="del(item)"
                 class="inline"
                 tabindex="0"
                 v-for="(item, index) in selectedItems">
                <span :class="`${prefixCls}-selected-tag__label`">
                  <slot :item="item" name="item">
                      <span v-html="format(item)"></span>
                  </slot>
                </span>
                <span :class="`${prefixCls}-selected-tag__icon`">
                    <va-icon type="times"></va-icon>
                </span>
            </div>
          </template>
          <template v-else>
            <div class="inline">
              <slot :item="selectedItems[0]" name="item">
                  <span v-html="format(selectedItems[0])"></span>
              </slot>
            </div>
          </template>
        </span>
            &nbsp;&nbsp;
            <va-icon :type="show ? 'angle-up' : 'angle-down'"></va-icon>
        </va-button>
        <transition name="fadeDown">
            <ul :class="[`${prefixCls}-dropdown-menu`, search ? `${prefixCls}-has-search` : ``]"
                :style="{maxHeight: menuMaxHeight, width: menuWidth}"
                ref="menu"
                v-show="show"
                v-va-position="show">
                <li v-if="search">
                    <div :class="`${prefixCls}-search-wrap`">
                        <va-input :class="`${prefixCls}-select-search`"
                                  :placeholder="inputPlaceholder"
                                  @confirm="addExtra"
                                  icon="search"
                                  icon-style="solid"
                                  no-v-model
                                  ref="searchInput"
                                  show-clean
                                  size="xs"
                                  v-model="searchText"
                                  width="210px"/>
                    </div>

                    <!-- <va-icon type="plus-square" v-if="extra" @click.native="addExtra"></va-icon> -->
                </li>
                <li :class="`${prefixCls}-select-all`" v-if="multiple">
                    <a @click.prevent="selectAll">
                        {{getL('all')}}
                        <va-icon color="#0052CC" margin="5px 0 0 0" size="10px" type="check"
                                 v-show="allSelected"></va-icon>
                    </a>
                </li>

                <div :class="`${prefixCls}-select-items-wrapper`">
                    <slot>
                        <va-option
                                :key="option.value"
                                :label="option.label"
                                :value="option.value"
                                v-for="option in filterOptions">
                        </va-option>
                    </slot>
                </div>

                <div :class="`${prefixCls}-notify`" transition="fadeDown" v-show="showNotify">Limit: {{limit}}</div>
            </ul>
        </transition>
        <div class="clearfix"></div>
        <validate
                :current="value"
                :custom-validate="customValidate"
                :name="name"
                :rules="rules"
                v-model="validStatus">
        </validate>
    </div>
</template>

<script>
  import EventListener from '../utils/EventListener'
  import validationMixin from '../Mixin/validationMixin'
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
      context: {},
      type: {
        type: String,
        default: 'default',
        required: false,
        note: 'The type of button to render as the Select button. See VaButton for possible values.'
      },
      options: {
        type: Array,
        default() {
          return []
        },
        required: false,
        note: 'Accepts an array of objects with value and label keys: { value: \'apple\', label: \'Apple\' }'
      },
      value: {},
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
        type: String,
        default: '300px',
        required: false,
        note: 'The maximum height of the dropdown menu.'
      },
      menuWidth: {
        type: String,
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
        default(item) {
          if (!item) return ''
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
    data() {
      return {
        validStatus: '',
        searchText: '',
        show: false,
        showNotify: false,
        currentValue: this.value,
        currentOptions: this.options,
        activeItemClass: this.prefixCls + '-select-item-active'
      }
    },
    provide() {
      return {
        addSelectOption: this.addOption,
        selectOption: this.select,
        isOptionSelected: this.isSelected
      }
    },
    watch: {
      value(val) {
        if (this.inner) {
          this.inner = false
          return
        }
        this.inner = true
        this.currentValue = val
      },
      options(val) {
        this.currentOptions = val
      },
      currentValue(val) {
        if (this.inner) {
          this.inner = false
          return
        }
        this.inner = true
        this.$emit('input', val)
        this.$emit('change', val)
      },
      multiple(val) {
        if (val === false) {
          if (Array.isArray(this.value) && this.value.length > 1) {
            this.value = this.value[0]
          }
        }
      },
      show(val) {
        if (val) {
          if (this.search) {
            this.$refs.searchInput.focus()
          }
        }
      }
    },
    components: {
      validate
    },
    created() {
      document.addEventListener('keyup', this.keyup)
    },
    computed: {
      classObj() {
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
      filterOptions() {
        return this.filter(this.currentOptions, this.searchText)
      },
      selectedItems: {
        get() {
          var a
          if (type.isArray(this.currentValue)) {
            a = this.currentValue
          } else {
            a = [this.currentValue]
          }
          return this.findInOptions(a)
        },
        set(value) {
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
      allSelected() {
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
      showPlaceholder() {
        if (type.isArray(this.currentValue)) {
          return this.currentValue.length <= 0
        } else {
          return type.isNullOrUndefined(this.currentValue) || this.currentValue === ''
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this._closeEvent = EventListener.listen(window, 'click', (e) => {
          if (!this.$el.contains(e.target)) this.show = false
        })
      })
    },
    beforeDestroy() {
      if (this._closeEvent) this._closeEvent.remove()
      document.removeEventListener('keyup', this.keyup)
    },
    methods: {
      isSelected(option) {
        return this.findIndex(option.value) !== -1
      },
      keyup(e) {
        if (e.keyCode === 27) {
          this.show = false
        }
      },
      filter(options, search) {
        if (search === '') return options
        var ret = []
        for (var i = 0, l = options.length; i < l; i++) {
          var v = options[i] && String(options[i].label).replace(/<.*?>/g, '')
          var s = search

          if (!this.matchCase) {
            v = v.toLocaleLowerCase()
            s = s.toLocaleLowerCase()
          }

          if (v !== '' && v.indexOf(s) > -1) {
            ret.push(options[i])
          }
        }
        return ret
      },
      selectAll() {
        if (this.allSelected) {
          this.selectedItems = []
        } else {
          this.selectedItems = this.filter(this.currentOptions, this.searchText)
        }
      },
      addExtra() {
        if (this.extra && this.searchText.replace(/\s+$|^\s+/g, '')) {
          this.addOption(this.searchText, this.searchText)
          this.add({value: this.searchText, label: this.searchText})
          this.searchText = ''
        }
      },
      findInOptions(a) {
        var options = this.currentOptions
        var ret = []

        for (var i = 0; i < a.length; i++) {
          var s = this.find(a[i], options)
          s != null ? ret.push(s) : 0
        }
        return ret
      },
      find(v, array) {
        var a = array || this.selectedItems
        for (var i = 0; i < a.length; i++) {
          if (v === a[i].value) {
            return a[i]
          }
        }
        return null
      },
      findIndex(v, array) {
        var a = array || this.selectedItems
        for (var i = 0; i < a.length; i++) {
          if (v === a[i].value) {
            return i
          }
        }
        return -1
      },
      optionExists(option) {
        return this.currentOptions
          .map((option) => option.value)
          .indexOf(option.value) !== -1
      },
      addOption(value, label) {
        let option = {
          value, label
        }
        if (this.optionExists(option)) {
          console.log(option)
          return
        }
        this.currentOptions.push(option)
      },
      add(option) {
        var a = this.selectedItems.slice(0)
        if (this.multiple) {
          a.push(option)
        } else {
          a = [option]
        }
        this.selectedItems = a
      },
      del(item) {
        var index = this.findIndex(item.value)
        this.remove(this.selectedItems, index, 1)
      },
      remove(array, index, num) {
        var a = array.slice(0)
        num ? a.splice(index, num) : a.splice(index)
        this.selectedItems = a
      },
      select(option) {
        var index = this.findIndex(option.value)
        if (this.multiple) {
          index === -1 ? this.add(option) : this.remove(this.selectedItems, index, 1)
        } else {
          index === -1 ? this.selectedItems = [option] : this.noUncheck ? this.selectedItems = [option] : this.selectedItems = []
          this.show = false
          this.$refs.button.focus()
        }
      },
      toggleDropdown() {
        if (!this.disabled && !this.readonly) {
          this.show = !this.show
        }
      }
    }
  }
</script>
