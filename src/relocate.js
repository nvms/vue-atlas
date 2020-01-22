import Vue from 'vue'

const getWindowSize = () => {
  const ww = window.innerWidth
  const wh = window.innerHeight
  return {
    width: ww,
    height: wh
  }
}

const getPosition = (el) => {
  const rect = el.getBoundingClientRect()
  return {
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    x: rect.x,
    y: rect.y
  }
}

const removeClassByPrefix = (el, prefix) => {
  const regx = new RegExp('\\b' + prefix + '(.*)?\\b', 'g')
  el.className = el.className.replace(regx, '')
  return el
}

const relocate = (el) => {
  const pos = getPosition(el)
  const win = getWindowSize()
  let pos1 = 'right'
  let pos2 = 'bottom'

  if (pos.width + pos.left > win.width - 20) {
    pos1 = 'left'
  }

  if (pos.height + pos.top > win.height) {
    pos2 = 'top'
  }

  el.classList.add('position-' + pos1 + '-' + pos2)
}

export default {
  componentUpdated (el, binding) {
    if (!binding.value) {
      setTimeout(() => {
        removeClassByPrefix(el, 'position-')
      }, 400)
      return
    }
    if (binding.value !== binding.oldValue) {
      Vue.nextTick(() => {
        relocate(el)
      })
    }
  }
}
