import VaSelect from './VaSelect.vue'
import VaOption from './VaOption.vue'
import position from '../position'

export default Vue => {
  Vue.component(VaSelect.name, VaSelect)
  Vue.component(VaOption.name, VaOption)
  Vue.directive('VaPosition', position)
}
