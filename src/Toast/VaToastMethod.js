import Vue from 'vue'
import VaToastComponent from './VaToast'

const VaToast = Vue.extend(VaToastComponent)

export default function (obj) {
  const domNode = document.createElement('div')
  document.body.appendChild(domNode)

  const options = {
    el: domNode,
    propsData: {}
  }

  const allowedProps = ['text', 'placement', 'type', 'duration', 'closeOnClick']

  allowedProps.forEach((prop) => {
    if (Object.keys(obj).includes(prop)) {
      options.propsData[prop] = obj[prop]
    }
  })

  const instance = new VaToast(options)

  instance.show = true

  if (instance.duration > 0) {
    setTimeout(() => {
      instance.show = false
      Vue.nextTick(() => {
        instance.$destroy()
      })
    }, instance.duration)
  }
}
