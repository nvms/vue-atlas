<template>
  <transition name="fade">
    <span :class="classObj" ref="load">
      <i :class="iclassObj"/>
      <slot/>
      <svg viewBox="0 0 50 50" class="va-spinner">
        <circle
          class="va-path"
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
      const { center } = this
      const classes = {}

      classes['va-page-loading-con'] = true
      classes['va-loading-center'] = center

      return classes
    },
    iclassObj () {
      const { type, size } = this
      const classes = {}

      classes['va-page-loading'] = true
      type ? (classes['va-loading-' + type] = true) : ''
      size ? (classes['va-loading-' + size] = true) : ''

      return classes
    }
  }
}
</script>

<style lang="scss">
.va-page-loading-con {
  display: inline-block;
  z-index: 1000;
  position: relative;
  /*see _button.scss for more position information related to*/
  /*-page-loading-con being inside of a button*/
  transition: opacity 0.15s ease-in-out;
  // opacity: 0;
}
.va-path {
  stroke: #dcdcdc;
  stroke-linecap: round;
  stroke-width: 5px;
  transform-origin: center center 0px;
  animation: newdash 1s ease-in-out forwards;
}
.va-spinner {
  transform-origin: center center 0px;
  animation: rotate 1s cubic-bezier(0.4, 0.15, 0.6, 0.85) infinite;
}

.va-loading-center {
  .va-loading-xl {
    margin: -35px 0 0 -35px;
  }
}
.va-loading-xl {
  width: 60px;
  + svg {
    width: 60px;
  }
}

.va-loading-center {
  .va-loading-lg {
    margin: -20px 0 0 -20px;
  }
}
.va-loading-lg {
  width: 40px;
  + svg {
    width: 40px;
  }
}

.va-loading-center {
  .va-loading-md {
    margin: -15px 0 0 -15px;
  }
}
.va-loading-md {
  width: 30px;
  + svg {
    width: 30px;
    transform-origin: center center 0px;
  }
}

.va-loading-center {
  .va-loading-sm {
    margin: -9px 0 0 -9px;
  }
}
.va-loading-sm {
  width: 18px;
  + svg {
    width: 18px;
  }
}

.va-loading-center {
  .va-loading-xs {
    margin: -6px 0 0 -6px;
  }
}
.va-loading-xs {
  width: 12px;
  + svg {
    width: 12px;
  }
}

.va-page-loading {
  animation: rotate 2s linear infinite;
  font-size: 28px;
  float: left;
  width: 20px;
}
.va-loading-center {
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
