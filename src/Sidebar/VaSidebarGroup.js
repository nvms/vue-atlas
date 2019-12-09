/**
 * Original implementation by MisRob and released under the MIT license.
 * https://github.com/MisRob/vue-tree-navigation
 * Modified for use with vue-atlas
 */
import { insertMetadataToItems, generateLevel } from './core'
import events from '../utils/events'

const VaSidebarGroup = {
  mixins: [events],
  props: {
    items: {
      type: Array,
      required: false
    },
    defaultOpenLevel: {
      type: Number,
      default: 0
    },
    showToggle: {
      type: Boolean,
      default: false,
      required: false
    },
    title: {
      type: String,
      default: '',
      required: false
    }
  },
  computed: {
    itemsWithMetadata () {
      const self = this

      if (self.items !== undefined) {
        return insertMetadataToItems(self.items)
      }

      return false
    }
  },
  watch: {
    showToggle (val) {
      this.dispatch('VaApp', 'Va@configShowToggleChange', val)
    }
  },
  mounted () {
    setTimeout(() => {
      this.dispatch('VaApp', 'Va@configShowToggleChange', this.showToggle)
    }, 10)
  },
  render (createElement) {
    const { title } = this
    const self = this
    const level = 1
    const tree = createElement(
      'ul',
      generateLevel(
        createElement,
        self.itemsWithMetadata,
        level,
        self.defaultOpenLevel,
        self.showToggle
      )
    )
    const level0 = createElement(
      'div',
      {
        class: ['va-sidebar-navigationlevel', 'va-sidebar-navigationlevel-level-0']
      },
      [tree]
    )
    const treeNavigation = createElement(
      'div',
      {
        class: 'va-sidebar-treenavigation'
      },
      [level0]
    )
    const contentSlot = createElement('div', this.$slots.default)
    const headerItem = createElement(
      'div',
      {
        class: 'va-sidebar-group-title'
      },
      [
        createElement('span', title)
      ]
    )
    const entireGroup = createElement(
      'div',
      {

      },
      [headerItem, contentSlot, treeNavigation]
    )

    return entireGroup
  }
}

export default VaSidebarGroup
