<!--
 * Original implementation by MisRob and released under the MIT license.
 * https://github.com/MisRob/vue-tree-navigation
 * Modified for use with vue-atlas
 */
-->
<template>
  <span :class="classObj" ref="itemText" v-on="itemMethod">
    <!-- The toggle icon -->
    <span
      v-if="st && toggleType === 'circle'"
      class="va-sidebar-group-item-text-icon"
    >
      <va-icon type="circle"/>
    </span>

    <span class="va-sidebar-group-item-text">
      <!-- The item's FontAwesome icon, if any -->
      <span v-if="showIcon" class="va-sidebar-group-item-icon">
        <va-icon
          v-if="item.iconColor"
          :type="item.icon"
          :color="item.iconColor"
          :size="item.iconSize"
          :icon-style="item.iconStyle"
        />
        <va-icon
          v-else
          :type="item.icon"
          :size="item.iconSize"
          :icon-style="item.iconStyle"
        />
      </span>

      <!-- If this is just a label -->
      <span
        v-if="showLabel"
        class="va-sidebar-group-item-label"
        :style="styleObj"
      >
        {{item.name}}
        <span
          v-if="item.sub"
          class="va-sidebar-group-item-substring"
        >{{item.sub}}</span>
      </span>

      <!-- If this is a router link -->
      <router-link
        v-if="showRouterLink"
        :to="item.meta.target"
        class="va-sidebar-group-item-router-link"
        :style="styleObj"
      >
        {{item.name}}
        <span
          v-if="item.sub"
          class="va-sidebar-group-item-substring"
        >{{item.sub}}</span>
      </router-link>

      <!-- If this is a hyperlink -->
      <a
        v-if="showHyperLink"
        :href="item.meta.target"
        class="va-sidebar-group-item-link"
        :style="styleObj"
      >
        {{item.name}}
        <span
          v-if="item.sub"
          class="va-sidebar-group-item-substring"
        >{{item.sub}}</span>
      </a>

      <!-- If this is an external hyperlink -->
      <a
        v-if="showExternalHyperLink"
        :href="item.meta.target"
        target="_blank"
        class="va-sidebar-group-item-external-link"
        :style="styleObj"
      >
        {{item.name}}
        <span
          v-if="item.sub"
          class="va-sidebar-group-item-substring"
        >{{item.sub}}</span>
      </a>

      <!-- If there's a lozenge -->
      <span v-if="item.lozenge" style="display: flex;">
        <va-lozenge
          :bold="item.lozenge.bold"
          uppercase
          :type="item.lozenge.type"
        >{{item.lozenge.text}}</va-lozenge>
      </span>
    </span>
  </span>
</template>

<script>
const stripTrailingSlash = (str) => {
  return str.endsWith('/') ? str.slice(0, -1) : str
}
export default {
  name: 'VaSidebarGroupItem',
  props: {
    item: {
      type: Object
    },
    isOpen: {
      type: Boolean,
      default: false
    },
    showToggle: {
      type: Boolean,
      default: false
    },
    toggleType: {
      type: String,
      required: false
    }
  },
  data () {
    const s = this.showToggle
    return {
      st: s,
      minified: false
    }
  },
  created () {
    this.$on('Va@showToggleChange', val => {
      this.st = val
    })
  },
  computed: {
    itemHasMethod () {
      return this.item.method !== undefined
    },
    itemMethod () {
      if (this.itemHasMethod) {
        return {
          click: this.item.method
        }
      }

      return false
    },
    showIcon () {
      return this.item.icon !== undefined
    },
    showLabel () {
      return (
        this.item.route === undefined &&
        this.item.element === undefined &&
        this.item.external === undefined
      )
    },
    showLink () {
      return this.item.route !== undefined || this.item.element !== undefined
    },
    showHyperLink () {
      return this.showLink && this.$router === undefined
    },
    showExternalHyperLink () {
      return this.item.external !== undefined
    },
    showRouterLink () {
      return this.showLink && this.$router !== undefined
    },
    classObj () {
      const { minified } = this
      const classes = {}

      classes['va-sidebar-group-item-text'] = true
      classes['va-sidebar-group-item-minified'] = minified

      return classes
    },
    styleObj () {
      const { showIcon } = this
      const style = {}

      style['padding-left'] = showIcon ? '0px' : '0px'

      return style
    }
  },
  methods: {
    setAsActiveIfActive () {
      const parentElement = this.$refs.itemText.parentElement
      if (parentElement.classList) {
        if (parentElement.classList.contains('active')) {
          parentElement.classList.remove('active')
        }
      }
      if (this.item.route !== undefined) {
        if (this.$route !== undefined && this.$route.path !== undefined) {
          if (this.item.route === this.$route.path) {
            if (parentElement.classList) {
              parentElement.classList.add('active')
            }
          }
        } else {
          if (stripTrailingSlash(this.item.route) === stripTrailingSlash(window.location.pathname)) {
            if (parentElement.classList) {
              parentElement.classList.add('active')
            }
          }
        }
      }
    }
  },
  watch: {
    item () {},
    $route () {
      this.setAsActiveIfActive()
    }
  },
  mounted () {
    if (!this.$router) {
      window.addEventListener('hashchange', () => {
        // todo
      })
    }

    this.setAsActiveIfActive()
  }
}
</script>
