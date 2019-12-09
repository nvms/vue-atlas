/**
 * Original implementation by MisRob and released under the MIT license.
 * https://github.com/MisRob/vue-tree-navigation
 * Modified for use with vue-atlas
 */
import VaSidebarGroupLevel from './VaSidebarGroupLevel.vue'
import VaSidebarGroupItem from './VaSidebarGroupItem.vue'

import {
  getRelativeUrl,
  // sanitizeElement,
  sanitizeRoute,
  startsWithUrl
} from './utils'

/**
 * Recursive function.
 * One call generates one level of the tree.
 */
export const generateLevel = (
  createElement,
  items,
  level,
  defaultOpenLevel,
  showToggle
) => {
  const children = []

  if (items !== undefined && items !== false) {
    items.forEach(item => {
      if (item.hasOwnProperty('children')) {
        const navLevel = createElement(
          VaSidebarGroupLevel,
          {
            props: {
              parentItem: item,
              level,
              open: renderLevelAsOpen(item, level, defaultOpenLevel),
              showToggle
            }
          },
          [
            ...generateLevel(
              createElement,
              item.children,
              level + 1,
              defaultOpenLevel,
              showToggle
            )
          ]
        )

        children.push(createElement('li', [navLevel]))
      } else {
        const navItem = createElement(VaSidebarGroupItem, {
          props: {
            item,
            showToggle,
            toggleType: 'circle'
          }
        })

        children.push(createElement('li', { class: 'va-sidebar-group-item' }, [navItem]))
      }
    })
  }

  return children
}

/**
 * Level should be opened in following cases
 * - level is less than or equal to default open level
 * - its URL is a part of an active URL
 * - it contains a child which URL is a part of an active URL
 */
export const renderLevelAsOpen = (parentItem, level, defaultOpenLevel) => {
  if (defaultOpenLevel >= level) {
    return true
  }

  const currentUrl = getRelativeUrl(
    window.location.href,
    window.location.origin
  )

  if (
    parentItem.meta.target !== '' &&
    startsWithUrl(currentUrl, parentItem.meta.target) === true
  ) {
    return true
  }

  for (let i = 0; i < parentItem.children.length; i++) {
    const child = parentItem.children[i]

    if (
      child.meta.target !== '' &&
      startsWithUrl(currentUrl, child.meta.target) === true
    ) {
      return true
    }
  }

  return false
}

/**
 * Recursive function.
 * Insert metadata containing the navigation path and its type to each item.
 **/
export const insertMetadataToItems = (items, parent) => {
  if (items !== undefined && items !== false) {
    items.forEach(item => {
      item.meta = getItemMetadata(item, parent)

      if (item.hasOwnProperty('children')) {
        item.children = insertMetadataToItems(item.children, item)
      }
    })

    return items
  }

  return false
}

/**
 * Return item metadata object: { path: ..., target: ... }
 */
export const getItemMetadata = (item, parent) => {
  // const element = sanitizeElement(item.element)
  // const route = sanitizeRoute(item.route)
  const element = item.element
  const route = item.route
  const external = item.external
  const icon = item.icon || false
  const method = item.method || false
  const iconColor = item.iconColor || false
  const iconSize = item.iconSize || '1em'
  const iconStyle = item.iconStyle || 'solid'

  // item is its own parent
  if (parent === undefined) {
    if (
      element === undefined &&
      route === undefined &&
      external === undefined
    ) {
      return {
        path: '',
        target: ''
      }
    }

    if (external !== undefined) {
      return {
        path: '',
        target: external
      }
    }

    if (route !== undefined) {
      return {
        path: route,
        target: route
      }
    }

    if (element !== undefined) {
      return {
        path: '',
        target: '/' + element
      }
    }
  }

  const parentPath = sanitizeRoute(parent.meta.path)

  if (external !== undefined) {
    return {
      icon,
      iconColor,
      iconSize,
      iconStyle,
      method,
      path: parentPath,
      target: external
    }
  }

  if (route !== undefined) {
    return {
      icon,
      iconColor,
      iconSize,
      iconStyle,
      method,
      path: route,
      target: route
    }
  }

  if (element !== undefined) {
    return {
      icon,
      iconColor,
      iconSize,
      iconStyle,
      method,
      path: parentPath,
      target: sanitizeRoute(parentPath + element)
    }
  }

  return {
    icon,
    iconColor,
    iconSize,
    iconStyle,
    method,
    path: parentPath,
    target: ''
  }
}
