import VaModal from './VaModal.vue'
import VaModalMethod from './VaModalMethod'

export default Vue => {
  Vue.component(VaModal.name, VaModal)
  Vue.prototype.VaModal = VaModalMethod
}
