import VaPageHeader from './VaPageHeader.vue'
import VaBreadcrumb from '../Breadcrumb/VaBreadcrumb.vue'
import VaBreadcrumbItem from '../Breadcrumb/VaBreadcrumbItem.vue'

export default Vue => {
  Vue.component(VaPageHeader.name, VaPageHeader)
  Vue.component(VaBreadcrumb.name, VaBreadcrumb)
  Vue.component(VaBreadcrumbItem.name, VaBreadcrumbItem)
}
