import VaDatepicker from './VaDatepicker.vue'
import relocate from '../relocate'

export default Vue => {
  Vue.component(VaDatepicker.name, VaDatepicker)
  Vue.directive('VaPosition', relocate)
}
