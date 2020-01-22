<template>
  <transition name="fade">
    <div ref="dom" :class="classObj" @click="handleClick" v-if="show">
      <span v-text="text"/>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'VaToast',
  props: {
    text: {
      type: String,
      required: true
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
      }
    },
    type: {
      type: String,
      default: 'default',
      validator (v) {
        return [
          'default',
          'success',
          'primary',
          'info',
          'warning',
          'danger'
        ].includes(v)
      }
    },
    duration: {
      type: Number,
      default: 3000
    },
    closeOnClick: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      show: false
    }
  },
  computed: {
    classObj () {
      const { placement, type } = this
      const classes = {}

      classes['va-toast'] = true
      classes['va-toast-' + type] = true
      classes['va-toast-' + placement] = true

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
      handler (val) {
        this.setT = window.clearTimeout(this.setT)
        if (val) {
          this.$nextTick(() => {
            // recompute position
            if (this.placement === 'top' || this.placement === 'bottom') {
              this.$refs.dom.style.marginLeft =
                (-1 * this.$refs.dom.offsetWidth) / 2 + 'px'
            } else if (this.placement === 'center') {
              this.$refs.dom.style.marginLeft =
                (-1 * this.$refs.dom.offsetWidth) / 2 + 'px'
              this.$refs.dom.style.marginTop =
                (-1 * this.$refs.dom.offsetHeight) / 2 + 'px'
            }
          })
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" src="../style/_reset.scss" scoped></style>
<style lang="scss">
@import "../variables";

$toastTop: 20px;
$toastBottom: 20px;
$toastRight: 20px;
$toastLeft: 20px;

.va-toast {
  position: fixed;
  border-radius: 5px;
  font-size: 14px;
  line-height: 1;
  cursor: default;
  z-index: 2000;
  white-space: nowrap;
  vertical-align: baseline;
  text-align: center;
  padding: 6px 10px;
  &-default {
    background: $N30;
    color: $N400;
  }
  &-success {
    background: $G100;
    color: $G400;
  }
  &-warning {
    background: $Y100;
    color: $N700;
  }
  &-primary {
    background: $B100;
    color: $N0;
  }
  &-info {
    background: $T200;
    color: $N0;
  }
  &-danger {
    background: $R300;
    color: $N0;
  }
}

.va-toast-center {
  margin: 0 auto;
  left: 50%;
  top: 50%;
}

.va-toast-top {
  top: $toastTop;
  margin: 0 auto;
  left: 50%;
}

.va-toast-bottom {
  bottom: $toastBottom;
  margin: 0 auto;
  left: 50%;
  top: initial;
}

.va-toast-top-right {
  top: $toastTop;
  right: $toastRight;
  left: initial;
}

.va-toast-top-left {
  top: $toastTop;
  left: $toastLeft;
}

.va-toast-bottom-right {
  bottom: $toastBottom;
  right: $toastRight;
  left: initial;
  top: initial;
}

.va-toast-bottom-left {
  top: initial;
  bottom: $toastBottom;
  left: $toastBottom;
}
</style>
