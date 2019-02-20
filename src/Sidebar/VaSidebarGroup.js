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
    },
    classPrefix: {
      type: String,
      default: 'va'
    }
  },
  computed: {
    itemsWithMetadata () {
      const self = this

      if (self.items !== undefined) {
        const items = JSON.parse(JSON.stringify(self.items))
        return insertMetadataToItems(items)
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
    let { classPrefix, title } = this
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
        class: [classPrefix + '-sidebar-navigationlevel', classPrefix + '-sidebar-navigationlevel-level-0']
      },
      [tree]
    )
    const treeNavigation = createElement(
      'div',
      {
        class: classPrefix + '-sidebar-treenavigation'
      },
      [level0]
    )
    const headerItem = createElement(
      'div',
      {
        class: classPrefix + '-sidebar-group-title'
      },
      [
        createElement('span', title)
      ]
    )
    const entireGroup = createElement(
      'div',
      {

      },
      [headerItem, treeNavigation]
    )

    return entireGroup
  }
}

export default VaSidebarGroup
