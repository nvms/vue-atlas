<template>
  <div :class="classObj" :style="styleObj">
    <va-button
      :class="[`va-dropdown-toggle`, `va-select-btn`, showSelected && multiple && value.length ? `va-select-multiple` : '', show ? `va-select-btn-open` : '']"
      :disabled="disabled"
      :size="size"
      :style="{minWidth:'100%'}"
      :type="type"
      @mousedown.native="toggleDropdown"
      ref="button"
    >
      <transition name="fade">
        <span
          class="va-select-placeholder"
          v-if="showPlaceholder || !showSelected"
        >{{placeholder}}</span>
      </transition>
      <span style="display: flex;flex-wrap: wrap;margin-right:14px;" v-if="showSelected">
        <template v-if="multiple">
          <transition-group name="fade" class="va-trans-group-flex">
            <div
              class="va-selected-tag va-selected-tag-multiple"
              :key="index"
              @click.stop="del(item)"
              tabindex="0"
              v-for="(item, index) in selectedItems"
            >
              <span class="va-selected-tag__label">
                <slot :item="item" name="item">
                  <span v-html="format(item)"/>
                </slot>
              </span>
              <span class="va-selected-tag__icon">
                <va-icon type="times"/>
              </span>
            </div>
          </transition-group>
        </template>
        <template v-else>
          <div class="va-single-flex-wrap">
            <slot :item="selectedItems[0]" name="item">
              <span v-html="format(selectedItems[0])"/>
            </slot>
          </div>
        </template>
      </span>
      &nbsp;&nbsp;
      <va-icon :type="show ? 'angle-up' : 'angle-down'" color="#A5ADBA"/>
    </va-button>
    <transition name="fadeDown">
      <ul
        :class="[`va-dropdown-menu`, search ? `va-has-search` : ``]"
        :style="{minWidth: '100%', maxHeight: menuMaxHeight}"
        ref="menu"
        v-show="show"
        v-va-position="show"
      >
        <li v-if="search">
          <div class="va-search-wrap">
            <va-input
              class="va-select-search"
              :placeholder="inputPlaceholder"
              @confirm="addExtra"
              icon="search"
              icon-style="solid"
              ref="searchInput"
              clearable
              v-model="searchText"
            />
          </div>
        </li>
        <li class="va-select-all" v-if="multiple">
          <a @click.prevent="selectAll">
            {{getL('all')}}
            <va-icon
              color="#0052CC"
              margin="5px 0 0 0"
              size="10px"
              type="check"
              v-show="allSelected"
            />
          </a>
        </li>
        <div class="va-select-items-wrapper">
          <slot>
            <va-option
              :key="index"
              :label="option.label"
              :value="option.value"
              v-for="(option, index) in filterOptions"
            />
          </slot>
        </div>
        <div
          class="va-notify"
          transition="fadeDown"
          v-show="showNotify"
        >Limit: {{limit}}</div>
      </ul>
    </transition>
    <div class="clearfix"/>
    <validate
      :current="value"
      :custom-validate="customValidate"
      :name="name"
      :rules="rules"
      v-model="validStatus"
    />
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
      required: false
    },
    inputPlaceholder: {
      type: String,
      default: '',
      required: false
    },
    size: {
      type: String,
      required: false
    },
    context: {},
    type: {
      type: String,
      default: 'default',
      required: false
    },
    options: {
      type: Array,
      default () {
        return []
      },
      required: false
    },
    value: {},
    multiple: {
      type: Boolean,
      default: false,
      required: false
    },
    search: {
      type: Boolean,
      default: false,
      required: false
    },
    extra: {
      type: Boolean,
      default: false,
      required: false
    },
    limit: {
      type: Number,
      default: 1024,
      required: false
    },
    menuMaxHeight: {
      type: String,
      default: '300px',
      required: false
    },
    matchCase: {
      type: Boolean,
      default: false,
      required: false
    },
    format: {
      type: Function,
      default (item) {
        if (!item) return ''
        return item.label
      }
    },
    noUncheck: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data () {
    return {
      validStatus: '',
      searchText: '',
      show: false,
      showNotify: false,
      currentValue: this.value,
      currentOptions: this.options,
      activeItemClass: 'va-select-item-active'
    }
  },
  provide () {
    return {
      addSelectOption: this.addOption,
      selectOption: this.select,
      isOptionSelected: this.isSelected
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
    },
    show (val) {
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
  created () {
    document.addEventListener('keyup', this.keyup)
  },
  computed: {
    defaultSlotWasUsed () {
      return !!this.$slots.default
    },
    styleObj () {
      const style = {}
      const { actualWidth } = this

      actualWidth.slice(-1) === '%'
        ? (style['width'] = actualWidth)
        : (style['min-width'] = actualWidth)

      return style
    },
    classObj () {
      const { validStatus } = this
      const classes = {}

      classes['va-has-error'] = validStatus === 'error'
      classes['va-has-success'] = validStatus === 'success'
      classes['va-has-warn'] = validStatus === 'warn'

      classes['va-btn-group'] = true
      classes['va-select-group'] = true
      classes['va-dropdown-con'] = true

      return classes
    },
    filterOptions () {
      return this.filter(this.currentOptions, this.searchText)
    },
    selectedItems: {
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
        const self = this
        if (this.multiple) {
          const ret = []
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
    showPlaceholder () {
      if (type.isArray(this.currentValue)) {
        return this.currentValue.length <= 0
      } else {
        return !this.currentValue
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this._closeEvent = EventListener.listen(window, 'click', e => {
        if (!this.$el.contains(e.target)) this.show = false
      })
    })
  },
  beforeDestroy () {
    if (this._closeEvent) this._closeEvent.remove()
    document.removeEventListener('keyup', this.keyup)
  },
  methods: {
    isSelected (option) {
      return this.findIndex(option.value) !== -1
    },
    keyup (e) {
      if (e.keyCode === 27) {
        this.show = false
      }
    },
    filter (options, search) {
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
    selectAll () {
      if (this.allSelected) {
        this.selectedItems = []
      } else {
        this.selectedItems = this.filter(this.currentOptions, this.searchText)
      }
    },
    addExtra () {
      if (this.extra && this.searchText.replace(/\s+$|^\s+/g, '')) {
        this.addOption(this.searchText, this.searchText)
        this.add({ value: this.searchText, label: this.searchText })
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
      var a = array || this.selectedItems
      for (var i = 0; i < a.length; i++) {
        if (JSON.stringify(v) === JSON.stringify(a[i].value)) {
          return a[i]
        }
      }
      return null
    },
    findIndex (v, array) {
      var a = array || this.selectedItems
      for (var i = 0; i < a.length; i++) {
        if (JSON.stringify(v) === JSON.stringify(a[i].value)) {
          return i
        }
      }
      return -1
    },
    optionExists (option) {
      return (
        this.currentOptions
          .map(option => option.value)
          .indexOf(option.value) !== -1
      )
    },
    addOption (value, label) {
      const option = {
        value,
        label
      }
      if (this.optionExists(option)) {
        return
      }
      this.currentOptions.push(option)
    },
    add (option) {
      var a = this.selectedItems.slice(0)
      if (this.multiple) {
        a.push(option)
      } else {
        a = [option]
      }
      this.selectedItems = a
    },
    del (item) {
      var index = this.findIndex(item.value)
      this.remove(this.selectedItems, index, 1)
    },
    remove (array, index, num) {
      var a = array.slice(0)
      num ? a.splice(index, num) : a.splice(index)
      this.selectedItems = a
    },
    select (option) {
      var index = this.findIndex(option.value)
      if (this.multiple) {
        index === -1
          ? this.add(option)
          : this.remove(this.selectedItems, index, 1)
      } else {
        index === -1
          ? (this.selectedItems = [option])
          : this.noUncheck
            ? (this.selectedItems = [option])
            : (this.selectedItems = [])
        this.show = false
        this.$refs.button.focus()
      }
    },
    toggleDropdown (e) {
      const tagName = e.target.tagName.toUpperCase()

      // If the target wasn't the button, don't open it
      if (tagName !== 'BUTTON') {
        e.preventDefault()
        e.stopPropagation()

        return
      }

      if (!this.disabled && !this.readonly) {
        this.show = !this.show
      }
    }
  }
}
</script>

<style lang="scss" src="../style/_reset.scss" scoped></style>
<style lang="scss">
@import "../variables";
@import "../style/animate";

.va-trans-group-flex {
  display: flex;
}

.va-single-flex-wrap {
  display: flex;
}

.va-select-placeholder {
  position: absolute;
}

@mixin select-theme-mixin(
  $hasErrorBtnBorder,
  $btnOpenBackgroundColor,
  $btnOpenColor,
  $selectedTagBackground,
  $selectedTagFocusOutline,
  $selectedTagHoverColor,
  $selectedTagHoverIconColor,
  $selectedTagIconColor,
  $selectedTagActiveColor,
  $selectedTagActiveIconColor,
  $searchOutline,
  $searchBorderBottom,
  $dropdownMenuBackground,
  $dropdownMenuBoxShadow,
  $notifyBackground,
  $notifyBorder,
  $notifyBoxShadow,
  $addButtonColor,
  $selectAllBorderBottom,
  $selectAllAnchorIconColor,
  $dropdownPlaceholderColor,
  $dropdownPlaceholderActiveColor,
  $itemActiveBackground,
  $itemActiveColor,
  $itemActiveHoverBackground,
  $selectOpenBtnFocusBoxShadow,
  $searchWrapBackground,
  $searchWrapBorderBottomColor
) {
  &-search {
    outline: $searchOutline;
    border-bottom: $searchBorderBottom;
  }

  &-group:hover {
      .va-selected-tag-multiple {
        box-shadow: inset 0 0 0 1px $N50;
        background: $N50;
      }
  }

  &-btn:active {
      .va-select-placeholder {
          color: $B400 !important;
      }
      .va-btn-text-fade {
          > i {
              color: $B400 !important;
          }
      }
  }

  &-btn-open {
    background-color: $btnOpenBackgroundColor;
    color: $btnOpenColor !important;
  }
  &-group {
    &.va-has-error {
      .va-btn {
        &:after {
          border: $hasErrorBtnBorder;
        }
      }
    }

    .va-search-wrap {
      background: $searchWrapBackground;
      border-bottom: 1px solid $searchWrapBorderBottomColor;
    }

    .va-selected-tag {
      $self: &;
      background: $selectedTagBackground;

      &:focus {
        outline: $selectedTagFocusOutline;
      }

      &__icon {
        color: $N200;
      }

      &:hover {
        color: $selectedTagHoverColor;

        .va-selected-tag__icon i {
          color: $selectedTagHoverIconColor !important;
        }
      }

      &:active {
        color: $selectedTagActiveColor;

        .va-selected-tag__icon i {
          color: $R500 !important;
        }
      }
    }

    .va-selected-tag-multiple {
        padding: 0 8px 0 8px !important;
        line-height: 1.6 !important;
        background: $N40;
        border-radius: 3px !important;
        box-shadow: inset 0 0 0 1px $N40;

        &:hover {
            box-shadow: inset 0 0 0 1px $R50;
            background: $R50;
        }

        &:active {
            box-shadow: inset 0 0 0 1px $R75 !important;
            background: $R75 !important;

            .va-selected-tag__label {
                color: $R500 !important;
            }
        }
    }

    .va-select-btn-open {
        .va-selected-tag-multiple:hover {
            box-shadow: inset 0 0 0 1px $R50;
            background: $R50;
        }

        .va-selected-tag-multiple:active {
            box-shadow: inset 0 0 0 1px $R75 !important;
            background: $R75 !important;

            .va-selected-tag__label {
                color: $R500 !important;
            }
        }
    }

    .va-select-btn-open {
        .va-selected-tag-multiple {
            box-shadow: inset 0 0 0 1px $B75;
            background: $B75;

            .va-selected-tag__label {
                color: $B300;
            }
            .va-selected-tag__icon i {
                color: $B300;
            }
        }
    }

    .va-select-btn:active {
        .va-selected-tag-multiple {
            box-shadow: inset 0 0 0 1px $B75;
            background: $B75;

            .va-selected-tag__label {
                color: $B300;
            }
            .va-selected-tag__icon i {
                color: $B300;
            }
        }
    }

    .va-dropdown-menu {
      background-color: $dropdownMenuBackground;
      -webkit-box-shadow: $dropdownMenuBoxShadow;
      box-shadow: $dropdownMenuBoxShadow;

      .va-notify {
        background: $notifyBackground;
        border: $notifyBorder;
        box-shadow: $notifyBoxShadow;
      }

      .va-fa-plus-square-o {
        color: $addButtonColor;
      }

      .va-select-all {
        border-bottom: $selectAllBorderBottom;

        a {
          i {
            color: $selectAllAnchorIconColor;
          }
        }
      }
    }

    .va-dropdown-toggle {
      .va-select-placeholder {
        color: $dropdownPlaceholderColor;
      }
    }

    .va-select-btn-open {
      .va-select-placeholder {
        color: $dropdownPlaceholderActiveColor;
      }
      .va-selected-tag:hover {
          .va-selected-tag__label {
              color: $R300;
          }
      }
      .va-selected-tag:active {
          .va-selected-tag__label {
              color: $R500;
          }
      }
      .va-selected-tag__label {
          color: $B400;
      }
      i {
        color: $dropdownPlaceholderActiveColor;
      }
    }
  }

  &-item-active {
    background: $itemActiveBackground;
    color: $itemActiveColor !important;

    &:hover {
      background: $itemActiveBackground !important;
      color: $itemActiveColor !important;
    }
  }

  /**
  No focus ring on an open Select
  */
  &-btn-open.va-btn:focus,
  &-btn-open.va-btn-focused {
    box-shadow: $selectOpenBtnFocusBoxShadow;
  }
}

.va-select,
.va--theme-light .va-select {
  @include select-theme-mixin(
    $hasErrorBtnBorder: 2px solid $R400 !important,
    $btnOpenBackgroundColor: rgba(179, 212, 255, 0.6) !important,
    $btnOpenColor: $B400 !important,
    $selectedTagBackground: none,
    $selectedTagFocusOutline: none,
    $selectedTagHoverColor: $R300,
    $selectedTagHoverIconColor: $R300,
    $selectedTagIconColor: $N60,
    $selectedTagActiveColor: $R500 !important,
    $selectedTagActiveIconColor: $R500 !important,
    $searchOutline: none,
    $searchBorderBottom: 0px solid $N40,
    $dropdownMenuBackground: $N0,
    $dropdownMenuBoxShadow: (
      rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
      rgba(9, 30, 66, 0.31) 0px 0px 1px
    ),
    $notifyBackground: $Y100,
    $notifyBorder: 1px solid $N100,
    $notifyBoxShadow: inset 0 1px 1px rgba(0, 0, 0, 0.05),
    $addButtonColor: $N60,
    $selectAllBorderBottom: 1px solid $N40,
    $selectAllAnchorIconColor: $N60,
    $dropdownPlaceholderColor: $N70,
    $dropdownPlaceholderActiveColor: $B400,
    $itemActiveBackground: $N700,
    $itemActiveColor: $N0,
    $itemActiveHoverBackground: $N20 !important,
    $selectOpenBtnFocusBoxShadow: none,
    $searchWrapBackground: #f4f5f7,
    $searchWrapBorderBottomColor: #e0e0e0
  );
}

.va-select-group {
  .va-select-btn-open {
    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: 3px;
    }

    & > div > i {
      color: $B400 !important;
    }

    & .va-single-flex-wrap {
      color: $B400 !important;
    }
  }

  &:active {
    .va-selected-tag__icon i {
      color: $B400;
    }
  }

  .va-selected-tag {
    $self: &;
    display: flex;
    align-items: baseline;
    padding: 0 0 0 8px;
    margin-right: 5px;
    border-radius: 2px;
    line-height: 2;
    position: relative;
    z-index: 20;

    &__label {
      margin-right: 0.5em;
    }

    &__icon {
      font-size: 0.7em;
      top: -1px;
      position: relative;
      left: 6px;
    }
  }

  .va-select-btn.va-btn {
    cursor: pointer;

    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: 3px;
      z-index: 15;
    }
  }

  .va-search-wrap {
    padding: 10px 10px 10px 10px;
    z-index: 10;
    margin-top: -4px;
  }

  .va-select-search {
    border: 0px;
    padding: 0;
    width: 100%;
    font-size: 14px;
    z-index: 10;
  }

  .va-dropdown-menu {
    display: block;
    overflow-y: auto;
    list-style-type: none;
    padding: 0;
    margin: 0;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    float: left;
    min-width: 200px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 4px 0;
    margin-top: 6px;
    margin-bottom: 6px;
    border-radius: 3px;
    list-style-type: none;

    li {
      a {
        padding: 8px 34px 8px 12px;

        span {
          cursor: default;
        }
      }
    }

    .va-notify {
      position: absolute;
      bottom: 5px;
      width: 96%;
      margin: 0 2%;
      min-height: 26px;
      padding: 3px 5px;
      border-radius: 3px;
      pointer-events: none;
    }

    .va-select-all {
      position: relative;
      cursor: default;
    }
  }

  .va-has-search {
    width: 230px;
  }

  .va-dropdown-toggle {
    text-align: left;
    display: flex;
    align-items: center;
    min-width: 80px;
    justify-content: space-evenly;

    .va-btn-text-fade {
      justify-content: space-between !important;

      i {
        position: inherit;
        right: 7px;
        top: 50%;
        margin-top: -1px;
        margin-right: 3px;
      }
    }

    & > span {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
    }
  }
}

.va-select-items-wrapper {
  overflow-y: auto;
  cursor: default;
}

.va-select-group {
  .va-dropdown-toggle {
    width: 100%;
  }
}
</style>
