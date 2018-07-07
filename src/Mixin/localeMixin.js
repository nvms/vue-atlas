import locale from '../Locale/index'

export default (name) => {
  return {
    methods: {
      getL (key) {
        return locale[name][key][this.VaLocale || window.VaLocale || 'en']
      }
    }
  }
}
