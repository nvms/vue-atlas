import position from './position.js'

// import VaToast from './Toast/VaToast.vue'
import VaTab from './Tabs/VaTab.vue'
import VaForm from './Form/VaForm.vue'
import VaRow from './Layout/VaRow.vue'
import VaIcon from './Icon/VaIcon.vue'
import VaPage from './Page/VaPage.vue'
import VaTabs from './Tabs/VaTabs.vue'
import VaCard from './Card/VaCard.vue'
import VaTable from './Table/VaTable.vue'
import VaRange from './Range/VaRange.vue'
import VaAside from './Aside/VaAside.vue'
import VaAffix from './Affix/VaAffix.vue'
import VaAlert from './Alert/VaAlert.vue'
import VaModal from './Modal/VaModal.vue'
import VaBadge from './Badge/VaBadge.vue'
import VaRadio from './Radio/VaRadio.vue'
import VaInput from './Input/VaInput.vue'
import VaSelect from './Select/VaSelect.vue'
import VaTopbar from './Topbar/VaTopbar.vue'
import VaMobile from './Mobile/VaMobile.vue'
import VaButton from './Button/VaButton.vue'
import VaColumn from './Layout/VaColumn.vue'
import VaOption from './Select/VaOption.vue'
import VaFormItem from './Form/VaFormItem.vue'
import VaMinibar from './Sidebar/VaMinibar.vue'
import VaLoading from './Loading/VaLoading.vue'
import VaTooltip from './Tooltip/VaTooltip.vue'
import VaSidebar from './Sidebar/VaSidebar.vue'
import VaLozenge from './Lozenge/VaLozenge.vue'
import VaRadioBtn from './Radio/VaRadioBtn.vue'
import VaDesktop from './Desktop/VaDesktop.vue'
import VaCheckbox from './Checkbox/VaCheckbox.vue'
import VaContainer from './Layout/VaContainer.vue'
import VaDropdown from './Dropdown/VaDropdown.vue'
import VaTextarea from './Textarea/VaTextarea.vue'
import VaRadioGroup from './Radio/VaRadioGroup.vue'
import VaModalMethod from './Modal/VaModalMethod.js'
import VaToastMethod from './Toast/VaToastMethod.js'
import VaTypeahead from './Typeahead/VaTypeahead.vue'
import VaSidebarGroup from './Sidebar/VaSidebarGroup'
import VaAnimQueue from './AnimQueue/VaAnimQueue.vue'
import VaButtonGroup from './Button/VaButtonGroup.vue'
import VaMinibarItem from './Sidebar/VaMinibarItem.vue'
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

const Components = {
  // VaToast,
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
  VaMinibar,
  VaTooltip,
  VaLoading,
  VaSidebar,
  VaDesktop,
  VaDropdown,
  VaTextarea,
  VaFormItem,
  VaRadioBtn,
  VaCheckbox,
  VaAnimQueue,
  VaContainer,
  VaTypeahead,
  VaDatepicker,
  VaBreadcrumb,
  VaPageHeader,
  VaTimepicker,
  VaRadioGroup,
  VaPlaceholder,
  VaButtonGroup,
  VaCheckboxBtn,
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
  VaLayoutManagerConfig
}

const install = function (Vue, locale) {
  for (let i in Components) {
    Vue.component(i, Components[i])
  }

  Vue.directive('VaPosition', position)
  Vue.prototype.VaToast = VaToastMethod
  Vue.prototype.VaModal = VaModalMethod
  Vue.prototype.VaLocale = locale || 'en'
  window.VaLocale = locale || 'en'
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

Components.install = install

export default Components
