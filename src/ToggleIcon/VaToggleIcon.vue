<template>
    <span class="wrapper" v-on="listeners" :style="style">
        <transition-group name="fade">
            <va-icon class="icon" v-if="isActive" v-bind="$attrs" :type="typeActive" :size="size" :key="1"/>
            <va-icon class="icon" v-else v-bind="$attrs" :type="type" :size="size" :key="2"/>
        </transition-group>
    </span>
</template>

<script>
  export default {
    name: 'VaToggleIcon',
    inheritAttrs: false,
    props: {
      active: {
        type: Boolean,
        default: false
      },
      trigger: {
        type: String,
        default: 'hover',
        validator (v) {
          return [
            'hover',
            'click'
          ].includes(v)
        },
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
        this.isActive = val
      }
    },
    computed: {
      listeners () {
        switch (this.trigger) {
          case 'hover':
            return {
              mouseenter: this.onActivate,
              mouseleave: this.onDeactivate
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
        isActive: this.active,
        style: {
          display: 'inline-block',
          width: this.$props.size,
          height: this.$props.size,
          position: 'relative'
        }
      }
    },
    methods: {
      toggle () {
        this.isActive = !this.isActive
      },
      onActivate () {
        this.isActive = true
      },
      onDeactivate () {
        this.isActive = false
      }
    }
  }
</script>

<style scoped>
    .icon {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
</style>
