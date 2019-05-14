import VaTimepicker from './VaTimepicker.vue'
import relocate from '../relocate'

export default Vue => {
  Vue.component(VaTimepicker.name, VaTimepicker)
  Vue.directive('VaPosition', relocate)
}
