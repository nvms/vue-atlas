<template>
    <div :class="classObj" :style="styleObj">
        <va-button
                :class="[`${classPrefix}-dropdown-toggle`, `${classPrefix}-select-btn`, showSelected && multiple && value.length ? `${classPrefix}-select-multiple` : '', show ? `${classPrefix}-select-btn-open` : '']"
                :disabled="disabled"
                :size="size"
                :style="{minWidth:'100%'}"
                :type="type"
                @click.native="toggleDropdown"
                ref="button">
            <span :class="`${classPrefix}-select-placeholder`"
                  v-if="showPlaceholder || !showSelected">{{placeholder}}</span>
            <span style="display: flex;" v-if="showSelected">
              <template v-if="multiple">
                <div :class="`${classPrefix}-selected-tag`"
                    :key="index"
                    @click.stop="del(item)"
                    tabindex="0"
                    v-for="(item, index) in selectedItems">
                    <span :class="`${classPrefix}-selected-tag__label`">
                      <slot :item="item" name="item">
                          <span v-html="format(item)"></span>
                      </slot>
                    </span>
                    <span :class="`${classPrefix}-selected-tag__icon`">
                        <va-icon type="times"></va-icon>
                    </span>
                </div>
              </template>
              <template v-else>
                <div>
                  <slot :item="selectedItems[0]" name="item">
                      <span v-html="format(selectedItems[0])"></span>
                  </slot>
                </div>
              </template>
            </span>
            &nbsp;&nbsp;
            <va-icon :type="show ? 'angle-up' : 'angle-down'" color="#A5ADBA"></va-icon>
        </va-button>
        <transition name="fadeDown">
            <ul :class="[`${classPrefix}-dropdown-menu`, search ? `${classPrefix}-has-search` : ``]"
                :style="{minWidth: '100%', maxHeight: menuMaxHeight}"
                ref="menu"
                v-show="show"
                v-va-position="show">
                <li v-if="search">
                    <div :class="`${classPrefix}-search-wrap`">
                        <va-input :class="`${classPrefix}-select-search`"
                                  :placeholder="inputPlaceholder"
                                  @confirm="addExtra"
                                  icon="search"
                                  icon-style="solid"
                                  ref="searchInput"
                                  clearable
                                  v-model="searchText" />
                    </div>
                    <!-- <va-icon type="plus-square" icon-style="solid" v-if="extra" @click.native="addExtra"></va-icon> -->
                </li>
                <li :class="`${classPrefix}-select-all`" v-if="multiple">
                    <a @click.prevent="selectAll">
                        {{getL('all')}}
                        <va-icon color="#0052CC" margin="5px 0 0 0" size="10px" type="check"
                                 v-show="allSelected"></va-icon>
                    </a>
                </li>

                <div :class="`${classPrefix}-select-items-wrapper`">
                    <slot>
                      <va-option
                        :key="index"
                        :label="option.label"
                        :value="option.value"
                        v-for="(option, index) in filterOptions">
                      </va-option>
                    </slot>
                </div>

                <div :class="`${classPrefix}-notify`" transition="fadeDown" v-show="showNotify">Limit: {{limit}}</div>
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
  import inputMixin from '../Mixin/inputMixin'

  export default {
    name: 'VaSelect',
    mixins: [validationMixin, inputMixin, localeMixin('VaSelect')],
    props: {
      showSelected: {
        type: Boolean,
        default: true,
        required: false,
      },
      inputPlaceholder: {
        type: String,
        default: '',
        required: false,
      },
      size: {
        type: String,
        required: false,
      },
      context: {},
      type: {
        type: String,
        default: 'default',
        required: false,
      },
      options: {
        type: Array,
        default() {
          return []
        },
        required: false,
      },
      value: {},
      multiple: {
        type: Boolean,
        default: false,
        required: false,
      },
      search: {
        type: Boolean,
        default: false,
        required: false,
      },
      extra: {
        type: Boolean,
        default: false,
        required: false,
      },
      limit: {
        type: Number,
        default: 1024,
        required: false,
      },
      menuMaxHeight: {
        type: String,
        default: '300px',
        required: false,
      },
      matchCase: {
        type: Boolean,
        default: false,
        required: false,
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
      },
      classPrefix: {
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
        activeItemClass: this.classPrefix + '-select-item-active'
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
      defaultSlotWasUsed () {
        return !!this.$slots.default
      },
      styleObj () {
        let style = {}
        let {actualWidth} = this

        actualWidth.slice(-1) === '%' ? style['width'] = actualWidth : style['min-width'] = actualWidth

        return style
      },
      classObj() {
        let {classPrefix, validStatus} = this
        let classes = {}

        classes[classPrefix + '-has-error'] = validStatus === 'error'
        classes[classPrefix + '-has-success'] = validStatus === 'success'
        classes[classPrefix + '-has-warn'] = validStatus === 'warn'

        classes[classPrefix + '-btn-group'] = true
        classes[classPrefix + '-select-group'] = true
        classes[classPrefix + '-dropdown-con'] = true

        return classes
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
          return !this.currentValue
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

          if (v !== '' && v.includes(s)) {
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
          if (JSON.stringify(v) === JSON.stringify(a[i].value)) {
            return a[i]
          }
        }
        return null
      },
      findIndex(v, array) {
        var a = array || this.selectedItems
        for (var i = 0; i < a.length; i++) {
          if (JSON.stringify(v) === JSON.stringify(a[i].value)) {
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
