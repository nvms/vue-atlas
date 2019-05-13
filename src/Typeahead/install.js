import VaTypeahead from './VaTypeahead.vue'
import relocate from '../relocate'

export default Vue => {
  Vue.component(VaTypeahead.name, VaTypeahead)
  Vue.directive('VaPosition', relocate)
}
