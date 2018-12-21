import VaApp from './VaApp.vue'
import VaAppConfig from './VaAppConfig.vue'

export default Vue => {
  Vue.component(VaApp.name, VaApp)
  Vue.component(VaAppConfig.name, VaAppConfig)
}
