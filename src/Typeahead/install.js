import VaTypeahead from './VaTypeahead.vue'
import position from '../position'

export default Vue => {
  Vue.component(VaTypeahead.name, VaTypeahead)
  Vue.directive('VaPosition', position)
}
