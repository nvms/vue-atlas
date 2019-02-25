<template>
  <div>
    <ul :class="classObj">
      <li
        v-for="(tab, i) in tabs"
        :key="i"
        :class="[liclassObj(tab), disabledTabClass(tab)]"
        v-show="tab.isVisible"
      >
        <a
          v-html="tab.header"
          @click="selectTab(tab.hash, $event)"
          :href="tab.hash"
        ></a>
      </li>
    </ul>
    <div :class="`${classPrefix}-tab-content`">
      <slot/>
    </div>
  </div>
</template>

<script>
import ExpiringStorage from '../utils/ExpiringStorage'

export default {
  name: 'VaTabs',
  props: {
    cacheLifetime: {
      type: Number,
      default: 5,
      required: false
    },
    options: {
      type: Object,
      required: false,
      default: () => ({
        useUrlFragment: false
      })
    },
    classPrefix: {
      type: String,
      default: 'va'
    }
  },
  data () {
    return {
      tabs: [],
      activeTabHash: ''
    }
  },
  computed: {
    classObj () {
      let { classPrefix } = this
      let classes = {}

      classes['clearfix'] = true
      classes[classPrefix + '-nav-tabs'] = true

      return classes
    },
    storageKey () {
      return `va-tabs.cache.${window.location.host}${window.location.pathname}`
    }
  },
  created () {
    this.tabs = this.$children
  },
  mounted () {
    window.addEventListener('hashchange', () =>
      this.selectTab(window.location.hash)
    )

    if (this.findTab(window.location.hash)) {
      this.selectTab(window.location.hash)
      return
    }

    const previousSelectedTabHash = ExpiringStorage.get(this.storageKey)

    if (this.findTab(previousSelectedTabHash)) {
      this.selectTab(previousSelectedTabHash)
      return
    }

    if (this.tabs.length) {
      this.selectTab(this.tabs[0].hash)
    }
  },
  methods: {
    findTab (hash) {
      return this.tabs.find(tab => tab.hash === hash)
    },
    selectTab (selectedTabHash, event) {
      if (event && !this.options.useUrlFragment) {
        event.preventDefault()
      }

      const selectedTab = this.findTab(selectedTabHash)

      if (!selectedTab) {
        return
      }

      if (selectedTab.isDisabled) {
        return
      }

      this.tabs.forEach(tab => {
        tab.isActive = tab.hash === selectedTab.hash
      })

      this.$emit('changed', { tab: selectedTab })

      this.activeTabHash = selectedTab.hash

      ExpiringStorage.set(this.storageKey, selectedTab.hash, this.cacheLifetime)
    },
    setTabVisible (hash, visible) {
      const tab = this.findTab(hash)

      if (!tab) {
        return
      }

      tab.isVisible = visible

      if (tab.isActive) {
        tab.isActive = visible

        this.tabs.every(tab => {
          if (tab.isVisible) {
            tab.isActive = true
            return false
          }
          return true
        })
      }
    },
    liclassObj (tab) {
      let { classPrefix } = this
      let classes = {}

      classes[classPrefix + '-nav-tab'] = true
      classes[classPrefix + '-nav-tab-active'] = tab.isActive

      return classes
    },
    disabledTabClass (tab) {
      if (tab.isDisabled) {
        return this.classPrefix + '-nav-tab-disabled'
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="scss">
.#{$class-prefix}-nav-tabs {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border-bottom: 2px solid $N30;
  .#{$class-prefix}-nav-tab {
    padding-bottom: 4px;
    margin-right: 15px;
    line-height: 20px !important;
    &-disabled {
      a {
        color: $N70 !important;
        font-weight: normal !important;
        cursor: not-allowed;
      }
    }
    a {
      color: $N300;
      font-weight: 600;
      padding-bottom: 6px;
      &:hover {
        text-decoration: none;
        color: $B300;
      }
      &:focus {
        outline: none;
      }
    }
    &-active {
      a {
        color: $B400;
        border-bottom: 2px solid $B300;
      }
    }
  }
}
</style>
