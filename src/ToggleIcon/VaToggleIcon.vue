<template>
    <span class="wrapper" v-on="listeners" :style="style">
        <transition-group name="fade">
            <va-icon class="icon" v-if="isActive" v-bind="$attrs" :type="typeActive" :key="1"/>
            <va-icon class="icon" v-else v-bind="$attrs" :type="type" :key="2"/>
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
          width: this.$attrs.size,
          height: this.$attrs.size,
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

<style>
    .icon {
        position: absolute;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }
</style>
