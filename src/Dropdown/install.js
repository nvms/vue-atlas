import VaDropdown from './VaDropdown.vue'
import relocate from '../relocate'

export default Vue => {
  Vue.component(VaDropdown.name, VaDropdown)
  Vue.directive('VaPosition', relocate)
}
