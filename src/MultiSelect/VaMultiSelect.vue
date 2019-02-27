<template>
  <div>
    <div :class="{'va-mselect': true, 'va-mselect--active': show}" @click="onInnerClick">
      <div class="va-mselect__inner">
        <div class="va-mselect__values">
          <span
            class="va-mselect__tag"
            :key="index"
            tabindex="0"
            v-for="(item, index) in selectedItems">
            <span class="va-mselect__tag-text">
              <slot :item="item" name="item">
                <span v-html="format(item)"/>
              </slot>
            </span>
            <span class="va-mselect__tag-remove" @click.stop="del(item)">
              <va-icon type="times"/>
            </span>
          </span>
          <input class="va-mselect__input" ref="input" v-model="searchText" />
        </div>
        <span class="va-mselect__clear" @click="clearAll" v-if="selectedItems.length > 0">
          <va-icon type="times-circle" />
        </span>
        <div class="va-mselect__indicator">
          <va-icon type="angle-down" />
        </div>
      </div>
      <transition name="fadeDown">
        <ul
          v-show="show"
          class="va-mselect__menu"
          v-va-position="show">
          <slot>
          <va-multi-select-option
            :key="index"
            :label="option.label"
            :text="option.text"
            :value="option.value"
            v-for="(option, index) in filterOptions"
          />
          </slot>
        </ul>
      </transition>
    </div>

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
import localeMixin from '../Mixin/localeMixin'
import type from '../utils/type'
import { relativeTimeThreshold } from 'moment'

export default {
  name: 'VaMultiSelect',
  mixins: [validationMixin, localeMixin('VaSelect')],
  components: { validate },
  props: {
    value: {},
    options: {
      type: Array,
      default () {
        return []
      },
      required: false
    },
    limit: {
      type: Number,
      default: 1024,
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
        return item.text
      }
    }
  },
  data () {
    return {
      validStatus: '',
      searchText: '',
      showNotify: false,
      currentValue: this.value,
      currentOptions: this.options,
      show: false,
      active: false
    }
  },
  provide () {
    return {
      addSelectOption: this.addOption,
      selectOption: this.select,
      isOptionSelected: this.isSelected
    }
  },
  methods: {
    onInnerClick (e) {
      this.$refs.input.focus()
      this.showDropdown()
    },
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
        if (v === a[i].value) {
          return a[i]
        }
      }
      return null
    },
    findIndex (v, array) {
      var a = array || this.selectedItems
      for (var i = 0; i < a.length; i++) {
        if (v === a[i].value) {
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
      let option = {
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
      a.push(option)
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
      index === -1
        ? this.add(option)
        : this.remove(this.selectedItems, index, 1)
    },
    toggleDropdown () {
      if (!this.disabled && !this.readonly) {
        this.show = !this.show
      }
    },
    showDropdown () {
      if (!this.disabled) {
        this.show = true
      }
    },
    clearAll () {
      this.selectedItems = []
    },
    hideDropdown () {
      this.show = false
    }
  },
  computed: {
    selectedItems: {
      get () {
        let a
        if (type.isArray(this.currentValue)) {
          a = this.currentValue
        } else {
          a = [this.currentValue]
        }
        return this.findInOptions(a)
      },
      set (value) {
        let self = relativeTimeThreshold
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
      }
    },
    filterOptions () {
      return this.filter(this.currentOptions, this.searchText)
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
  }
}
</script>

<style lang="scss">
.va-mselect {
  $self: &;
  background-color: $N20;
  border-radius: 4px;
  padding: 8px;
  cursor: text;
  position: relative;
  min-height: 40px;

  &--active {
    box-shadow: inset rgba($B100, 1) 0px 0px 0px 2px;
    background-color: white;
  }

  &__clear {
    display:flex;
    align-items: center;
    height:23px;
    i {
      color: $N100;
      font-size: 12px !important;
      &:hover {
        cursor: pointer;
        color: $N300;
      }
      &:active {
        color: $R100;
      }
    }
  }

  &__menu {
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
      rgba(9, 30, 66, 0.31) 0px 0px 1px;
    border-radius: 3px;
    margin-top: 6px;
    position: absolute;
    background-color: $N0;
    width: 100%;
    z-index: 10;
    top: 100%;
    left: 0;
    padding: 4px;
    list-style-type: none;

    &-item {
      cursor: pointer;
      text-decoration: none;

      i {
        position: absolute;
        left: 5px;
      }
      a.va-mselect__menu-item__anchor,
      a:link.va-mselect__menu-item__anchor {
        display: flex;
        align-items: center;

        &:hover {
          text-decoration: none;
          background-color: $N20;
        }
        &:active {
          background-color: $N30;
        }
      }
      &-value {
          position: relative;
          left: 20px;
          width: calc(100% - 20px);
          padding: 3px 5px;
          display: flex;
          justify-content: space-between;

          &__text {
            color: $N700;
          }
          &__label {
            color: $N100;
          }
      }
    }

    &-item--active {
      margin: 0;
      padding: 0;
      background-color: $N10;
    }
  }

  &__inner {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    align-items: center;

    #{$self}__values {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      flex: 1 1 0%;

      #{$self}__tag {
        display: flex;
        white-space: nowrap;
        background-color: $N40;
        max-width: 100%;
        margin: 2px;
        border-radius: 3px;
        outline: none;

        &-text {
          color: $N800;
          font-size: 85%;
          padding: 0 4px 0 4px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        &-remove {
          align-items: center;
          display: flex;
          padding: 0 5px;
          cursor: pointer;
          font-size: 9px;
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;

          &:hover {
            background: $R75;
          }
          &:active {
            background: $R100;
          }
        }
      }

      #{$self}__input {
        height: 100%;
        width: 60px;
        flex: 1 1 auto;
        line-height: 20px;
        border: 0px;
        background: transparent;
        margin: 5px 0 4px 0;

        &:focus {
          outline: none;
        }
      }
    }

    #{$self}__indicator {
      padding: 0 10px;
      font-size: 14px;
      color: $N500;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      height: 23px;
    }
  }
}
</style>
