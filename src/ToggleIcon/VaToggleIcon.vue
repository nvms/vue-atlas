<template>
    <span class="wrapper" v-on="listeners" :style="style">
        <transition name="fade">
            <va-icon v-if="actived" :type="typeActive"/>
            <va-icon v-else :type="type"/>
        </transition>
    </span>
</template>

<script>
  export default {
    name: 'VaToggleIcon',
    props: {
      active: {
        type: Boolean,
        default: false
      },
      trigger: {
        type: String,
        default: 'hover'
      },
      type: {
        type: String,
        required: true
      },
      typeActive: {
        type: String,
        required: true
      },
      size: {
        type: String,
        required: false,
        default: '1em',
        note: 'The size, in px or em, of the icon.'
      },
    },
    watch: {
      active (val) {
        this.actived = val
      }
    },
    computed: {
      listeners () {
        switch (this.trigger) {
          case 'hover':
            return {
              mouseenter: this.show,
              mouseleave: this.hide
            }
          case 'click':
            return {
              click: this.toggle
            }
          default:
            return {}
        }
      }
    },
    data () {
      return {
        actived: this.active,
        style: {
          display: 'inline-block',
          width: this.size,
          height: this.size
        }
      }
    },
    methods: {
      toggle () {
        this.actived = !this.actived
      },
      show () {
        this.actived = true
      },
      hide () {
        this.actived = false
      }
    }
  }
</script>
