export default {
  props: {
    name: {
      type: String,
      note: 'For validation: name of the validation element.'
    },
    customValidate: {
      type: Function
    },
    rules: {
      type: Array,
      note: 'For validation: custom validation rules.'
    }
  }
}
