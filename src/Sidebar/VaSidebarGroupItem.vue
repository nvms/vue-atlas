<!--
 * Original implementation by MisRob and released under the MIT license.
 * https://github.com/MisRob/vue-tree-navigation
 * Modified for use with vue-atlas
 */
-->
<template>
  <span :class="classObj" ref="itemText" v-on="itemMethod">

    <!-- The toggle icon -->
    <span v-if="st && toggleType === 'circle'" :class="`${prefixCls}-sidebar-group-item-text-icon`">
      <va-icon type="circle"></va-icon>
    </span>

    <span :class="`${prefixCls}-sidebar-group-item-text`">

      <!-- The item's FontAwesome icon, if any -->
      <span v-if="showIcon" :class="`${prefixCls}-sidebar-group-item-icon`">
        <va-icon v-if="item.iconColor" :type="item.icon" :color="item.iconColor" :size="item.iconSize" :icon-style="item.iconStyle"></va-icon>
        <va-icon v-else :type="item.icon" :size="item.iconSize" :icon-style="item.iconStyle"></va-icon>
      </span>

      <!-- If this is just a label -->
      <span v-if="showLabel" :class="`${prefixCls}-sidebar-group-item-label`" :style="styleObj">
        {{item.name}}
        <span v-if="item.sub" :class="`${prefixCls}-sidebar-group-item-substring`">{{item.sub}}</span>
      </span>

      <!-- If this is a router link -->
      <router-link v-if="showRouterLink" :to="item.meta.target" :class="`${prefixCls}-sidebar-group-item-router-link`" :style="styleObj">
        {{item.name}}
        <span v-if="item.sub" :class="`${prefixCls}-sidebar-group-item-substring`">{{item.sub}}</span>
      </router-link>

      <!-- If this is a hyperlink -->
      <a v-if="showHyperLink" :href="item.meta.target" :class="`${prefixCls}-sidebar-group-item-link`" :style="styleObj">
        {{item.name}}
        <span v-if="item.sub" :class="`${prefixCls}-sidebar-group-item-substring`">{{item.sub}}</span>
      </a>

      <!-- If this is an external hyperlink -->
      <a v-if="showExternalHyperLink" :href="item.meta.target" target="_blank" :class="`${prefixCls}-sidebar-group-item-external-link`" :style="styleObj">
        {{item.name}}
        <span v-if="item.sub" :class="`${prefixCls}-sidebar-group-item-substring`">{{item.sub}}</span>
      </a>

      <!-- If there's a lozenge -->
      <span v-if="item.lozenge" style="display: flex;">
        <va-lozenge uppercase :type="item.lozenge.type">{{item.lozenge.text}}</va-lozenge>
      </span>

    </span>

  </span>
</template>

<script>
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
    },
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  data () {
    let s = this.showToggle
    return {
      st: s,
      minified: false
    }
  },
  created () {
    this.$on('Va@showToggleChange', (val) => {
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
      let {prefixCls, minified} = this
      let klass = {}

      klass[prefixCls + '-sidebar-group-item-text'] = true
      klass[prefixCls + '-sidebar-group-item-minified'] = minified

      return klass
    },
    styleObj () {
      let {showIcon} = this
      let style = {}

      style['padding-left'] = showIcon ? '30px' : '0px'

      return style
    }
  },
  methods: {
    setAsActiveIfActive () {
      let parentElement = this.$refs.itemText.parentElement
      if (parentElement.classList) {
        if (parentElement.classList.contains('active')) {
          parentElement.classList.remove('active')
        }
      }
      if (this.item.route !== undefined) {
        if (this.$route.path !== undefined) {
          if (this.item.route === this.$route.path) {
            if (parentElement.classList) {
              parentElement.classList.add('active')
            }
          }
        }
      }
    }
  },
  watch: {
    item () {
    },
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
