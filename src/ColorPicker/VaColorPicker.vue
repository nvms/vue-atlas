<template>
  <va-button
    ref="colorpicker"
    @click.native="toggleColorPicker">
    <div :class="`${classPrefix}-color-picker-button-inner`">
      <va-icon type="square" :color="col" icon-style="solid" size="23px"></va-icon>
    </div>
    <va-color-picker-popup
      :color="color"
      :show="show"
      @change="onChange"
      :picker-position="position"></va-color-picker-popup>
  </va-button>
</template>

<script>
export default {
  name: 'VaColorPicker',
  props: {
    color: {
      type: String,
      default: '#b52525',
      required: false
    },
    classPrefix: {
      type: String,
      default: 'va'
    }
  },
  data () {
    let c = this.color
    return {
      col: c,
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
    },
    onChange (e) {
      this.col = 'rgba(' + e.rgba.r + ', ' + e.rgba.g + ', ' + e.rgba.b + ', ' + e.rgba.a + ')'
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
