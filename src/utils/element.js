// browser environment sniffing
var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]'

// UA sniffing for working around browser-specific quirks
var UA = inBrowser && window.navigator.userAgent.toLowerCase()
var isIE9 = UA && UA.indexOf('msie 9.0') > 0

/**
 * for IE9 compatibility: when both class and :class are present
 * getAttribute('class') returns wrong value..
 *
 * @param {Element} el
 * @return {String}
 */
function getClass (el) {
  var classname = el.className
  if (typeof classname === 'object') {
    classname = classname.baseVal || ''
  }
  return classname
}

/**
 * in IE9, setAttribute('class') will result in empty class
 * if the element also has the :class attribute; however in
 * phantomJS, setting `className` does not work on SVG elements..
 * so we have to do a conditional check here.
 *
 * @param {Element} el
 * @param {String} cls
 */
function setClass (el, cls) {
  if (isIE9 && !/svg$/.test(el.namespaceURI)) {
    el.className = cls
  } else {
    el.setAttribute('class', cls)
  }
}

/**
 * add class with compatibility for IE & SVG
 *
 * @param {Element} el
 * @param {String} cls
 */
function addClass (el, cls) {
  if (el.classList) {
    el.classList.add(cls)
  } else {
    var cur = ' ' + getClass(el) + ' '
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      setClass(el, (cur + cls).trim())
    }
  }
}

/**
 * remove class with compatibility for IE & SVG
 *
 * @param {Element} el
 * @param {String} cls
 */
function removeClass (el, cls) {
  if (el.classList) {
    el.classList.remove(cls)
  } else {
    var cur = ' ' + getClass(el) + ' '
    var tar = ' ' + cls + ' '
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ')
    }
    setClass(el, cur.trim())
  }
  if (!el.className) {
    el.removeAttribute('class')
  }
}

export default {
  getClass,
  removeClass,
  addClass,
  setClass,
  inBrowser,
  UA,
  isIE9
}
