import VaNotification from './VaNotification.vue'
import VaNotificationMethod from './VaNotificationMethod'

export default Vue => {
  Vue.component(VaNotification.name, VaNotification)
  Vue.prototype.VaNotification = VaNotificationMethod
}
