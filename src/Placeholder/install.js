import VaPlaceholder from './VaPlaceholder.vue'
import VaPlaceholderHeading from './VaPlaceholderHeading.vue'
import VaPlaceholderImage from './VaPlaceholderImage.vue'
import VaPlaceholderText from './VaPlaceholderText.vue'

export default Vue => {
  Vue.component(VaPlaceholder.name, VaPlaceholder)
  Vue.component(VaPlaceholderHeading.name, VaPlaceholderHeading)
  Vue.component(VaPlaceholderImage.name, VaPlaceholderImage)
  Vue.component(VaPlaceholderText.name, VaPlaceholderText)
}
