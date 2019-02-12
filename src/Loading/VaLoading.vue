<template>
  <span :class="classObj" ref="load">
    <i :class="iclassObj" />
    <slot />
    <svg viewBox="0 0 50 50" :class="`${classPrefix}-spinner`">
      <circle :class="`${classPrefix}-path`" :style="{ stroke: color }" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
    </svg>
  </span>
</template>

<script>
import { randomID } from '../utils/randomId'

export default {
  name: 'VaLoading',
  props: {
    type: {
      type: String
    },
    size: {
      type: String,
      default: 'md',
      validator (v) {
        return [
          'lg',
          'md',
          'sm',
          'xs'
        ].includes(v)
      }
    },
    center: {
      type: Boolean
    },
    fixed: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '#6C798F',
      required: false
    },
    classPrefix: {
      type: String,
      default: 'va'
    }
  },
  data () {
    return {
      originalParentID: null
    }
  },
  mounted () {
    if (!this.center) {
      this.originalParentID = randomID()
      this.$refs.load.parentElement.setAttribute('data-atlas-' + this.originalParentID, 'true')
    }
  },
  computed: {
    classObj () {
      let {classPrefix, center, fixed} = this
      let classes = {}

      classes['affix'] = fixed
      classes[classPrefix + '-page-loading-con'] = true
      classes[classPrefix + '-loading-center'] = center

      return classes
    },
    iclassObj () {
      let {classPrefix, type, size, color} = this
      let classes = {}

      classes[classPrefix + '-page-loading'] = true
      type ? classes[classPrefix + '-loading-' + type] = true : ''
      size ? classes[classPrefix + '-loading-' + size] = true : ''
      color ? classes['text-' + color] = true : ''

      return classes
    }
  },
  watch: {
    center (val) {
      if (val) {
        document.querySelector('body').appendChild(this.$refs.load)
        this.$once('hook:beforeDestroy', () => {
          document.querySelector('body').removeChild(this.$refs.load)
        })
      } else {
        document.querySelector('[data-atlas-' + this.originalParentID + '="true"]').appendChild(this.$refs.load)
      }
    }
  }
}
</script>
