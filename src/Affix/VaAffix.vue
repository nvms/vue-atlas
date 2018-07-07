<template>
  <div>
    <div :style="affixStyle" :class="classObj">
      <slot/>
    </div>
  </div>
</template>

<script>

function getScroll (w, top) {
  let ret = w['page' + (top ? 'Y' : 'X') + 'Offset']
  let method = 'scroll' + (top ? 'Top' : 'Left')
  if (typeof ret !== 'number') {
    let d = w.document
    // ie 6,7,8 standard mode
    ret = d.documentElement[method]

    if (typeof ret !== 'number') {
      // quirks mode
      ret = d.body[method]
    }
  }
  return ret
}

function getOffset (element) {
  let rect = element.getBoundingClientRect()
  let body = document.body
  let clientTop = element.clientTop || body.clientTop || 0
  let clientLeft = element.clientLeft || body.clientLeft || 0
  let scrollTop = getScroll(window, true)
  let scrollLeft = getScroll(window)

  return {
    top: rect.top + scrollTop - clientTop,
    left: rect.left + scrollLeft - clientLeft
  }
}

export default {
  name: 'VaAffix',
  props: {
    offset: {
      type: [Number, String],
      default: 0,
      required: false,
      note: 'Vertical offset distance to affix to'
    },
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  data () {
    return {
      affix: false,
      affixStyle: {}
    }
  },
  computed: {
    classObj () {
      let {prefixCls, affix} = this
      let klass = {}

      klass[prefixCls + '-affix'] = affix

      return klass
    }
  },
  mounted () {
    window.addEventListener('scroll', this._handleScroll, false)
    window.addEventListener('resize', this._handleScroll, false)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this._handleScroll, false)
    window.removeEventListener('resize', this._handleScroll, false)
  },
  methods: {
    _handleScroll () {
      const affix = this.affix
      const scrollTop = getScroll(window, true)
      const elemOffset = getOffset(this.$el)

      if (!affix && (elemOffset.top - this.offset) < scrollTop) {
        this.affix = true
        this.affixStyle = {
          top: this.offset + 'px',
          left: elemOffset.left + 'px',
          width: this.$el.offsetWidth + 'px'
        }
      } else if (affix && (elemOffset.top - this.offset) > scrollTop) {
        this.affix = false
        this.affixStyle = null
      }
    }
  }
}
</script>
