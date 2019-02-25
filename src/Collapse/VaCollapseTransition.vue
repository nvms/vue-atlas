<template>
  <transition name="VaCollapseTransition" @enter="enter" @leave="leave">
    <slot/>
  </transition>
</template>

<script>
import velocity from 'velocity-animate'

function animate (node, show, transitionName, done) {
  let ok

  function complete () {
    if (!ok) {
      ok = true
      done()
    }
  }

  node.style.display = show ? 'block' : 'none'
  velocity(node, transitionName, {
    duration: 200,
    complete: complete,
    easing: 'easeInOutQuad'
  })

  return {
    stop () {
      velocity(node, 'finish')
      complete()
    }
  }
}

export default {
  name: 'VaCollapseTransition',
  methods: {
    enter (element, done) {
      return animate(element, false, 'slideDown', done)
    },
    leave (element, done) {
      return animate(element, true, 'slideUp', done)
    }
  }
}
</script>
