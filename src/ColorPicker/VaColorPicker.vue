<template>
  <va-dropdown>
    <div slot="trigger">
      <va-button ref="colorpicker" @click.native.prevent="toggleColorPicker">
        <div class="va-color-picker-button-inner">
          <div :style="buttonStyleObj"/>
        </div>
      </va-button>
    </div>
    <va-color-picker-popup
      ref="colorpickerpopup"
      :color="color"
      :show="show"
      :hide-alpha="hideAlpha"
      @change="onChange"
    />
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
    hideAlpha: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const c = this.color
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
      this.col =
        'rgba(' +
        e.rgba.r +
        ', ' +
        e.rgba.g +
        ', ' +
        e.rgba.b +
        ', ' +
        e.rgba.a +
        ')'
      this.rgba =
        'rgba(' +
        e.rgba.r +
        ', ' +
        e.rgba.g +
        ', ' +
        e.rgba.b +
        ', ' +
        e.rgba.a +
        ')'
      this.rgb = 'rgb(' + e.rgba.r + ', ' + e.rgba.g + ', ' + e.rgba.b + ')'

      this.$emit('change', e)
    }
  },
  computed: {
    buttonStyleObj () {
      const style = {}

      style['width'] = '15px'
      style['height'] = '100%'
      style['border-radius'] = '50%'
      style['box-shadow'] = this.rgb + ' 0px 0px 0px 1px'
      style['background'] = this.rgba

      return style
    },
    classObj () {
      const classes = {}

      classes['va-color-picker'] = true

      return classes
    }
  }
}
</script>

<style lang="scss">
.va-color-picker-button-inner {
  height: 15px;
  line-height: 1;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==);
  border-radius: 50%;
}

.va-color-picker-popup {
  margin: 5px 10px;
  overflow: hidden;
}

.va-color-picker-upper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.va-color-picker-gradient {
  position: relative;
  width: 190px;
  height: 190px;
  border-radius: 3px;
  overflow: hidden;

  &-white {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 3px;
    background: linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0));
  }

  &-black {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 3px;
    background: linear-gradient(0deg, #000, transparent);
  }

  &-cursor {
    position: absolute;
    cursor: default;
    width: 10px;
    height: 10px;
    border: 2px solid #fff;
    border-radius: 50%;
    top: 50px;
    left: 50px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 0px 1px;
  }
}

.va-color-picker-border {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 3px;
  box-shadow: inset rgba(223, 225, 229, 0.5) 0px 0px 0px 2px;
}

.va-color-picker-hue-track {
  position: relative;
  width: 16px;
  height: 190px;
  border-radius: 3px;
  margin-left: 10px;
  background: linear-gradient(180deg, red, #ff0, #0f0, #0ff, #00f, #f0f, red);
  overflow: hidden;
}

.va-color-picker-alpha-cursor,
.va-color-picker-hue-cursor {
  position: absolute;
  cursor: default;
  width: 10px;
  height: 10px;
  left: 3px;
  border: 2px solid #fff;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 0px 1px;
}

.va-color-picker-alpha-track {
  position: relative;
  width: 16px;
  height: 190px;
  border-radius: 3px;
  margin-left: 10px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==);
  overflow: hidden;

  &-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 3px;
  }
}

.va-color-picker-lower {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
}
</style>
