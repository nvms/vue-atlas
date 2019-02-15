<template>
  <va-dropdown>
    <div slot="trigger">
      <va-button
        ref="colorpicker"
        @click.native="toggleColorPicker">
        <div :class="`${classPrefix}-color-picker-button-inner`">
          <div :style="buttonStyleObj" />
        </div>
      </va-button>
    </div>
    <va-color-picker-popup
      ref="colorpickerpopup"
      :color="color"
      :show="show"
      @change="onChange"/>
  </va-dropdown>
</template>

<script>
export default {
  name: 'VaColorPicker',
  props: {
    color: {
      type: String,
      default: '#ff6900',
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
      colors: {},
      show: false,
      rgba: '',
      rgb: ''
    }
  },
  methods: {
    toggleColorPicker () {
      this.$refs.colorpickerpopup.doShow()
    },
    onChange (e) {
      this.colors = e
      this.col = 'rgba(' + e.rgba.r + ', ' + e.rgba.g + ', ' + e.rgba.b + ', ' + e.rgba.a + ')'
      this.rgba = 'rgba(' + e.rgba.r + ', ' + e.rgba.g + ', ' + e.rgba.b + ', ' + e.rgba.a + ')'
      this.rgb = 'rgb(' + e.rgba.r + ', ' + e.rgba.g + ', ' + e.rgba.b + ')'

      this.$emit('change', e)
    }
  },
  computed: {
    buttonStyleObj () {
      let style = {}

      style['width'] = '15px'
      style['height'] = '100%'
      style['border-radius'] = '50%'
      style['box-shadow'] = this.rgb + ' 0px 0px 0px 1px'
      style['background'] = this.rgba

      return style
    },
    classObj () {
      let {classPrefix} = this
      let classes = {}

      classes[classPrefix + '-color-picker'] = true

      return classes
    }
  }
}
</script>
