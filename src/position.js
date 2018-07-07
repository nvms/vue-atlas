import Vue from 'vue'

const getTop = (e) => {
  let offset = e.offsetTop
  if (e.offsetParent != null) offset += getTop(e.offsetParent)
  return offset
}

const getLeft = (e) => {
  let offset = e.offsetLeft
  if (e.offsetParent != null) offset += getLeft(e.offsetParent)
  return offset
}

const calPosition = (el) => {
  let w = el.offsetWidth
  let h = el.offsetHeight
  let x = getLeft(el) - document.body.scrollLeft
  // let y = getTop(el) - document.body.scrollTop
  let y = getTop(el) - window.scrollY
  let ww = window.innerWidth || document.body.clientWidth
  let wh = window.innerHeight || document.body.clientHeight
  if (w && h) {
    let position1 = 'right'
    let position2 = 'bottom'

    el.classList.remove('position-right-bottom', 'position-right-top', 'position-left-bottom', 'position-left-top')

    // console.log('w', w)
    // console.log('x', x)
    // console.log('ww', ww)
    // console.log('h', h)
    // console.log('y', y)
    // console.log('wh', wh)

    if (w + x > ww) {
      position1 = 'left'
    }

    if (h + y > wh) {
      position2 = 'top'
    }

    if (y - h < 0) {
      position2 = 'bottom'
    }

    el.classList.add('position-' + position1 + '-' + position2)
  }
}

export default {
  componentUpdated (el, binding) {
    if (!binding.value) {
      setTimeout(() => {
        el.classList.remove('position-right-bottom', 'position-right-top', 'position-left-bottom', 'position-left-top')
      }, 400)
      return
    }
    if (binding.value !== binding.oldValue) {
      Vue.nextTick(() => {
        calPosition(el)
      })
    }
  }
}
