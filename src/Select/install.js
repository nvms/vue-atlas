import VaSelect from './VaSelect.vue'
import VaOption from './VaOption.vue'
import relocate from '../relocate'

export default Vue => {
  Vue.component(VaSelect.name, VaSelect)
  Vue.component(VaOption.name, VaOption)
  Vue.directive('VaPosition', relocate)
}
