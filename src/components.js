import VaIcon from './Icon/VaIcon.vue'
import VaToggleIcon from './ToggleIcon/VaToggleIcon.vue'
import VaToggle from './Toggle/VaToggle'
import VaRadio from './Radio/VaRadio.vue'
import VaAlert from './Alert/VaAlert.vue'
import VaRange from './Range/VaRange.vue'
import VaButton from './Button/VaButton.vue'
import VaLoading from './Loading/VaLoading.vue'
import VaCheckbox from './Checkbox/VaCheckbox.vue'
import VaRadioGroup from './Radio/VaRadioGroup.vue'

const Components = {
  VaIcon,
  VaToggleIcon,
  VaAlert,
  VaRange,
  VaRadio,
  VaButton,
  VaToggle,
  VaLoading,
  VaCheckbox,
  VaRadioGroup
}

const install = function (Vue, locale) {
  for (const i in Components) {
    Vue.component(i, Components[i])
  }

  Vue.prototype.VaLocale = locale || 'en'
  window.VaLocale = locale || 'en'
}

Components.install = install

export default Components
