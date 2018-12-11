import position from './position.js'

import VaTab from './Tabs/VaTab.vue'
import VaForm from './Form/VaForm.vue'
import VaRow from './Grid/VaRow.vue'
import VaIcon from './Icon/VaIcon.vue'
import VaPage from './Page/VaPage.vue'
import VaTabs from './Tabs/VaTabs.vue'
import VaCard from './Card/VaCard.vue'
import VaRange from './Range/VaRange.vue'
import VaAside from './Aside/VaAside.vue'
import VaAffix from './Affix/VaAffix.vue'
import VaTable from './Table/VaTable.vue'
import VaModal from './Modal/VaModal.vue'
import VaBadge from './Badge/VaBadge.vue'
import VaRadio from './Radio/VaRadio.vue'
import VaInput from './Input/VaInput.vue'
import VaAlert from './Alert/VaAlert.vue'
import VaOption from './Select/VaOption.vue'
import VaSelect from './Select/VaSelect.vue'
import VaTopbar from './Topbar/VaTopbar.vue'
import VaMobile from './Mobile/VaMobile.vue'
import VaButton from './Button/VaButton.vue'
import VaColumn from './Grid/VaColumn.vue'
import VaFormItem from './Form/VaFormItem.vue'
import VaInputOps from './Input/VaInputOps.vue'
import VaRadioBtn from './Radio/VaRadioBtn.vue'
import VaMinibar from './Minibar/VaMinibar.vue'
import VaLoading from './Loading/VaLoading.vue'
import VaTooltip from './Tooltip/VaTooltip.vue'
import VaDesktop from './Desktop/VaDesktop.vue'
import VaLozenge from './Lozenge/VaLozenge.vue'
import VaSidebar from './Sidebar/VaSidebar.vue'
import VaDropdown from './Dropdown/VaDropdown.vue'
import VaContainer from './Grid/VaContainer.vue'
import VaTextarea from './Textarea/VaTextarea.vue'
import VaCheckbox from './Checkbox/VaCheckbox.vue'
import VaRadioGroup from './Radio/VaRadioGroup.vue'
import VaToastMethod from './Toast/VaToastMethod.js'
import VaModalMethod from './Modal/VaModalMethod.js'
import VaTypeahead from './Typeahead/VaTypeahead.vue'
import VaSidebarGroup from './Sidebar/VaSidebarGroup'
import VaAnimQueue from './AnimQueue/VaAnimQueue.vue'
import VaButtonGroup from './Button/VaButtonGroup.vue'
import VaMinibarItem from './Minibar/VaMinibarItem.vue'
import VaPageHeader from './PageHeader/VaPageHeader.vue'
import VaBreadcrumb from './Breadcrumb/VaBreadcrumb.vue'
import VaCheckboxBtn from './Checkbox/VaCheckboxBtn.vue'
import VaTimepicker from './Timepicker/VaTimepicker.vue'
import VaDatepicker from './Datepicker/VaDatepicker.vue'
import VaSidebarHeader from './Sidebar/VaSidebarHeader.vue'
import VaPlaceholder from './Placeholder/VaPlaceholder.vue'
import VaColorPicker from './ColorPicker/VaColorPicker.vue'
import VaCheckboxGroup from './Checkbox/VaCheckboxGroup.vue'
import VaBreadcrumbItem from './Breadcrumb/VaBreadcrumbItem.vue'
import VaSidebarGroupItem from './Sidebar/VaSidebarGroupItem.vue'
import VaLayoutManager from './LayoutManager/VaLayoutManager.vue'
import VaSidebarScrollarea from './Sidebar/VaSidebarScrollarea.vue'
import VaSidebarGroupLevel from './Sidebar/VaSidebarGroupLevel.vue'
import VaPlaceholderText from './Placeholder/VaPlaceholderText.vue'
import VaSidebarGroupTitle from './Sidebar/VaSidebarGroupTitle.vue'
import VaColorPickerPopup from './ColorPicker/VaColorPickerPopup.vue'
import VaSidebarGroupToggle from './Sidebar/VaSidebarGroupToggle.vue'
import VaPlaceholderImage from './Placeholder/VaPlaceholderImage.vue'
import VaProgressTracker from './ProgressTracker/VaProgressTracker.vue'
import VaPlaceholderHeading from './Placeholder/VaPlaceholderHeading.vue'
import VaLayoutManagerConfig from './LayoutManager/VaLayoutManagerConfig.vue'
import VaNotification from './Notification/VaNotification.vue'
import VaNotificationMethod from './Notification/VaNotificationMethod.js'

const Components = {
  VaRow,
  VaTab,
  VaTabs,
  VaForm,
  VaCard,
  VaPage,
  VaIcon,
  VaRadio,
  VaTable,
  VaAside,
  VaRange,
  VaAffix,
  VaBadge,
  VaAlert,
  VaInput,
  VaModal,
  VaTopbar,
  VaMobile,
  VaSelect,
  VaButton,
  VaColumn,
  VaOption,
  VaLozenge,
  VaLoading,
  VaSidebar,
  VaDesktop,
  VaTooltip,
  VaMinibar,
  VaTextarea,
  VaInputOps,
  VaRadioBtn,
  VaCheckbox,
  VaDropdown,
  VaFormItem,
  VaContainer,
  VaTypeahead,
  VaAnimQueue,
  VaBreadcrumb,
  VaPageHeader,
  VaTimepicker,
  VaRadioGroup,
  VaDatepicker,
  VaButtonGroup,
  VaCheckboxBtn,
  VaPlaceholder,
  VaColorPicker,
  VaMinibarItem,
  VaSidebarGroup,
  VaSidebarHeader,
  VaCheckboxGroup,
  VaLayoutManager,
  VaBreadcrumbItem,
  VaProgressTracker,
  VaPlaceholderText,
  VaSidebarGroupItem,
  VaPlaceholderImage,
  VaColorPickerPopup,
  VaSidebarScrollarea,
  VaSidebarGroupLevel,
  VaSidebarGroupTitle,
  VaPlaceholderHeading,
  VaSidebarGroupToggle,
  VaLayoutManagerConfig,
  VaNotification
}

const install = function (Vue, locale) {
  for (let i in Components) {
    Vue.component(i, Components[i])
  }

  Vue.directive('VaPosition', position)
  Vue.prototype.VaToast = VaToastMethod
  Vue.prototype.VaModal = VaModalMethod
  Vue.prototype.VaNotification = VaNotificationMethod
  Vue.prototype.VaLocale = locale || 'en'
  window.VaLocale = locale || 'en'
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

Components.install = install

export default Components
