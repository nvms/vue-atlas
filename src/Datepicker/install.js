import VaDatepicker from './VaDatepicker.vue'
import position from '../position'

export default Vue => {
  Vue.component(VaDatepicker.name, VaDatepicker)
  Vue.directive('VaPosition', position)
}
