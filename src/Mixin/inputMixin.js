export default {
  props: {
    name: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    placeholder: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '100%'
    },
    customValidate: {
      type: Function
    },
    rules: {
      type: Array
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      validStatus: ''
    }
  },
  computed: {
    actualWidth () {
      const { width } = this

      switch (width) {
        case 'xs':
          return '80px'
        case 'sm':
          return '160px'
        case 'md':
          return '255px'
        case 'lg':
          return '320px'
        case 'xl':
          return '480px'
      }

      return width
    }
  }
}
