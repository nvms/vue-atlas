<template>
  <transition name="fade">
    <span :class="classObj" ref="load">
      <i :class="iclassObj"/>
      <slot/>
      <svg viewBox="0 0 50 50" :class="`${classPrefix}-spinner`">
        <circle
          :class="`${classPrefix}-path`"
          :style="{ stroke: color }"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke-width="5"
        />
      </svg>
    </span>
  </transition>
</template>

<script>
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
        return ['xl', 'lg', 'md', 'sm', 'xs'].includes(v)
      }
    },
    center: {
      type: Boolean
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
  mounted () {
    if (this.center) {
      document.querySelector('body').appendChild(this.$refs.load)
      this.$once('hook:beforeDestroy', () => {
        document.querySelector('body').removeChild(this.$refs.load)
      })
    }
  },
  computed: {
    classObj () {
      let { classPrefix, center } = this
      let classes = {}

      classes[classPrefix + '-page-loading-con'] = true
      classes[classPrefix + '-loading-center'] = center

      return classes
    },
    iclassObj () {
      let { classPrefix, type, size } = this
      let classes = {}

      classes[classPrefix + '-page-loading'] = true
      type ? (classes[classPrefix + '-loading-' + type] = true) : ''
      size ? (classes[classPrefix + '-loading-' + size] = true) : ''

      return classes
    }
  }
}
</script>

<style lang="scss">
.#{$class-prefix}-page-loading-con {
  display: inline-block;
  z-index: 1000;
  position: relative;
  /*see _button.scss for more position information related to*/
  /*-page-loading-con being inside of a button*/
  transition: opacity 0.3s ease-in-out;
  // opacity: 0;
}
.#{$class-prefix}-path {
  stroke: #dcdcdc;
  stroke-linecap: round;
  stroke-width: 5px;
  transform-origin: center center 0px;
  animation: newdash 1s ease-in-out forwards;
}
.#{$class-prefix}-spinner {
  transform-origin: center center 0px;
  animation: rotate 1s cubic-bezier(0.4, 0.15, 0.6, 0.85) infinite;
}

.#{$class-prefix}-loading-center {
  .#{$class-prefix}-loading-xl {
    margin: -35px 0 0 -35px;
  }
}
.#{$class-prefix}-loading-xl {
  width: 60px;
  + svg {
    width: 60px;
  }
}

.#{$class-prefix}-loading-center {
  .#{$class-prefix}-loading-lg {
    margin: -20px 0 0 -20px;
  }
}
.#{$class-prefix}-loading-lg {
  width: 40px;
  + svg {
    width: 40px;
  }
}

.#{$class-prefix}-loading-center {
  .#{$class-prefix}-loading-md {
    margin: -15px 0 0 -15px;
  }
}
.#{$class-prefix}-loading-md {
  width: 30px;
  + svg {
    width: 30px;
    transform-origin: center center 0px;
  }
}

.#{$class-prefix}-loading-center {
  .#{$class-prefix}-loading-sm {
    margin: -9px 0 0 -9px;
  }
}
.#{$class-prefix}-loading-sm {
  width: 18px;
  + svg {
    width: 18px;
  }
}

.#{$class-prefix}-loading-center {
  .#{$class-prefix}-loading-xs {
    margin: -6px 0 0 -6px;
  }
}
.#{$class-prefix}-loading-xs {
  width: 12px;
  + svg {
    width: 12px;
  }
}

.#{$class-prefix}-page-loading {
  animation: rotate 2s linear infinite;
  font-size: 28px;
  float: left;
  width: 20px;
}
.#{$class-prefix}-loading-center {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.88);
  display: flex;
  align-content: center;
  justify-content: center;
}
@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes newdash {
  0% {
    transform: rotate(50deg);
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  100% {
    transform: rotate(120deg);
    // stroke-dasharray: 16;
    stroke-dasharray: 30, 150;
    stroke-dashoffset: -35;
  }
}
</style>
