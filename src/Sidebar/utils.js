/**
 * Original implementation by MisRob and released under the MIT license.
 * https://github.com/MisRob/vue-tree-navigation
 * Modified for use with vue-atlas
 *
 * Remove a domain and router's `/#` from URL.
 */
export const getRelativeUrl = (url, origin) => {
  let relativeUrl = url.replace('/#/', '/')

  if (origin[origin.length - 1] === '/') {
    origin = origin.slice(0, -1)
  }
  relativeUrl = relativeUrl.replace(origin, '')

  return sanitizeRoute(relativeUrl)
}

/**
 * Remove an element appended to the end of a path.
 */
export const removeElementFromPath = path => {
  let hashPos

  while (hashPos !== -1) {
    hashPos = path.lastIndexOf('#')

    if (hashPos === -1) {
      return path
    }

    // do not cut of router url
    if (hashPos === path.indexOf('#/')) {
      return path
    }

    path = path.slice(0, hashPos)
  }
}

/**
 * First character should be #.
 */
export const sanitizeElement = element => {
  if (element === undefined || element === '') {
    return element
  }

  if (element[0] !== '#') {
    element = '#' + element
  }

  return element
}

/**
 * First character should be backslash.
 * Last character shouldn't be backslash.
 */
export const sanitizeRoute = route => {
  if (route === undefined) {
    return
  }

  if (route[0] !== '/') {
    route = '/' + route
  }

  if (route[route.length - 1] === '/') {
    route = route.slice(0, -1)
  }

  return route
}

/**
 * Check if a parent URL starts with another URL.
 * Ignore elements.
 */
export const startsWithUrl = (parentUrl, url) => {
  if (!url.startsWith('/#')) {
    url = removeElementFromPath(url)
  }

  if (parentUrl.startsWith(url)) {
    return true
  }

  return false
}
