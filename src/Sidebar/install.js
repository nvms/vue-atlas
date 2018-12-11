import VaSidebar from './VaSidebar.vue'
import VaSidebarGroup from './VaSidebarGroup'
import VaSidebarGroupItem from './VaSidebarGroupItem.vue'
import VaSidebarGroupLevel from './VaSidebarGroupLevel.vue'
import VaSidebarGroupTitle from './VaSidebarGroupTitle.vue'
import VaSidebarGroupToggle from './VaSidebarGroupToggle.vue'
import VaSidebarHeader from './VaSidebarHeader.vue'
import VaSidebarScrollarea from './VaSidebarScrollarea.vue'

export default Vue => {
  Vue.component(VaSidebar.name, VaSidebar)
  Vue.component(VaSidebarGroup.name, VaSidebarGroup)
  Vue.component(VaSidebarGroupItem.name, VaSidebarGroupItem)
  Vue.component(VaSidebarGroupLevel.name, VaSidebarGroupLevel)
  Vue.component(VaSidebarGroupTitle.name, VaSidebarGroupTitle)
  Vue.component(VaSidebarGroupToggle.name, VaSidebarGroupToggle)
  Vue.component(VaSidebarHeader.name, VaSidebarHeader)
  Vue.component(VaSidebarScrollarea.name, VaSidebarScrollarea)
}
