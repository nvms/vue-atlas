<template>
  <va-button
    :class="classObj"
    ref="colorpicker"
    @click.native="toggleColorPicker">
    <va-icon type="square" :color="color" icon-style="solid" size="21px"></va-icon>
    <va-color-picker-popup
      :color="color"
      :show="show"
      :picker-position="position"></va-color-picker-popup>
  </va-button>
</template>

<script>
export default {
  name: 'VaColorPicker',
  props: {
    color: {
      type: String,
      default: '#009688',
      required: false
    },
    classPrefix: {
      type: String,
      default: 'va'
    }
  },
  data () {
    return {
      show: false,
      position: {}
    }
  },
  mounted () {
    this.getPosition()
  },
  methods: {
    getPosition () {
      let rect = this.$refs.colorpicker.$el.getBoundingClientRect()
      this.position = {
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        x: rect.x,
        y: rect.y
      }
    },
    toggleColorPicker () {
      this.getPosition()
      this.show = !this.show
    }
  },
  computed: {
    classObj () {
      let {classPrefix} = this
      let classes = {}

      classes[classPrefix + '-color-picker'] = true

      return classes
    }
  }
}
</script>
