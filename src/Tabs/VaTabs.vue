<template>
  <div>
    <ul :class="classObj">
      <li
        v-for="(tab, i) in tabs"
        :key="i"
        :class="liclassObj(tab)"
        v-show="tab.isVisible">
        <a
          v-html="tab.header"
          @click="selectTab(tab.hash, $event)"
          :href="tab.hash">
        </a>
      </li>
    </ul>
    <div :class="`${prefixCls}-tab-content`">
      <slot />
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
    prefixCls: {
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
      let {prefixCls} = this
      let klass = {}

      klass['clearfix'] = true
      klass[prefixCls + '-nav-tabs'] = true

      return klass
    },
    storageKey () {
      return `va-tabs.cache.${window.location.host}${window.location.pathname}`
    }
  },
  created () {
    this.tabs = this.$children
  },
  mounted () {
    window.addEventListener('hashchange', () => this.selectTab(window.location.hash))

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
        tab.isActive = (tab.hash === selectedTab.hash)
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

        this.tabs.every((tab, index, array) => {
          if (tab.isVisible) {
            tab.isActive = true
            return false
          }
          return true
        })
      }
    },
    liclassObj (tab) {
      let {prefixCls} = this
      let klass = {}

      klass[prefixCls + '-nav-tab'] = true
      klass[prefixCls + '-nav-tab-active'] = tab.isActive

      return klass
    }
  }
}
</script>
