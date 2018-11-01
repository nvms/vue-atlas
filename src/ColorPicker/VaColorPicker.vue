<template>
  <va-button
    :class="classObj"
    ref="colorpicker"
    @click.native="toggleColorPicker">
    <va-icon type="palette" color="#7591C2" icon-style="solid"></va-icon>
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
      default: '#ffff00',
      required: false
    },
    prefixCls: {
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
      let {prefixCls} = this
      let klass = {}

      klass[prefixCls + '-color-picker'] = true

      return klass
    }
  }
}
</script>
