import VaTimepicker from './VaTimepicker.vue'
import position from '../position'

export default Vue => {
  Vue.component(VaTimepicker.name, VaTimepicker)
  Vue.directive('VaPosition', position)
}
