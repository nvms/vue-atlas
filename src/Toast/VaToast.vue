<template>
  <transition name="fade">
    <div
      ref="dom"
      :class="classObj"
      @click="handleClick"
      v-if="show">
      <span v-text="text" />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'VaToast',
  props: {
    text: {
      type: String,
      required: true,
      note: 'The inner text of the toast.'
    },
    placement: {
      type: String,
      default: 'center',
      validator (v) {
        return [
          'bottom-right',
          'top',
          'top-right',
          'top-left',
          'bottom',
          'bottom-left',
          'center'
        ].includes(v)
      },
      note: 'Where in the window the toast will appear.'
    },
    type: {
      type: String,
      default: 'default',
      validator (v) {
        return [
          'default',
          'default-notification',
          'success',
          'primary',
          'info',
          'warning',
          'danger'
        ].includes(v)
      },
      note: 'What kind of toast do you like?'
    },
    duration: {
      type: Number,
      default: 3000,
      note: 'Length in milliseconds until the toast disappears.'
    },
    closeOnClick: {
      type: Boolean,
      default: true,
      note: 'When true, clicking the toast will dismiss it immediately.'
    },
    classPrefix: {
      type: String,
      default: 'va'
    }
  },
  data () {
    return {
      show: false
    }
  },
  computed: {
    classObj () {
      let {classPrefix, placement, type} = this
      let classes = {}

      classes[classPrefix + '-toast'] = true
      classes[classPrefix + '-toast-' + type] = true
      classes[classPrefix + '-toast-' + placement] = true

      return classes
    }
  },
  methods: {
    handleClick () {
      if (this.closeOnClick) {
        this.show = false
      }
    }
  },
  watch: {
    show: {
      handler (val, newVal) {
        this.setT = window.clearTimeout(this.setT)
        if (val) {
          this.$nextTick(() => {
            // recompute position
            if (this.placement === 'top' || this.placement === 'bottom') {
              this.$refs.dom.style.marginLeft = -1 * this.$refs.dom.offsetWidth / 2 + 'px'
            } else if (this.placement === 'center') {
              this.$refs.dom.style.marginLeft = -1 * this.$refs.dom.offsetWidth / 2 + 'px'
              this.$refs.dom.style.marginTop = -1 * this.$refs.dom.offsetHeight / 2 + 'px'
            }
          })
        }
      },
      immediate: true
    }
  }
}
</script>
