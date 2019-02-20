import { mount, shallowMount } from '@vue/test-utils'
import VaPageHeader from '@/PageHeader/VaPageHeader.vue'

describe('VaPageHeader.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(VaPageHeader)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('does not render empty breadcrumb wrapper', () => {
    const wrapper = shallowMount(VaPageHeader, {
      slots: {}
    })

    expect(wrapper.find('.va-page-header-breadcrumb-container').exists()).toBeFalsy()
  })

  it('renders breadcrumb wrapper', () => {
    const wrapper = shallowMount(VaPageHeader, {
      slots: {
        breadcrumb: '<strong>Test</strong>'
      }
    })

    expect(wrapper.find('.va-page-header-breadcrumb-container').exists()).toBeTruthy()
  })

  it('does not render empty bottom wrapper', () => {
    const wrapper = shallowMount(VaPageHeader, {
      slots: {}
    })

    expect(wrapper.find('.va-page-header-bottom-wrapper').exists()).toBeFalsy()
  })

  it('renders bottom wrapper', () => {
    const wrapper = shallowMount(VaPageHeader, {
      slots: {
        bottom: '<strong>Test</strong>'
      }
    })

    expect(wrapper.find('.va-page-header-bottom-wrapper').exists()).toBeTruthy()
  })

  it('does not render empty actions wrapper', () => {
    const wrapper = shallowMount(VaPageHeader, {
      slots: {}
    })

    expect(wrapper.find('.va-page-header-actions-wrapper').exists()).toBeFalsy()
  })

  it('renders actions wrapper', () => {
    const wrapper = shallowMount(VaPageHeader, {
      slots: {
        actions: '<strong>Test</strong>'
      }
    })

    expect(wrapper.find('.va-page-header-actions-wrapper').exists()).toBeTruthy()
  })

  it('does not render empty subtitle wrapper', () => {
    const wrapper = shallowMount(VaPageHeader, {
      slots: {}
    })

    expect(wrapper.find('h2').exists()).toBeFalsy()
  })

  it('renders subtitle wrapper', () => {
    const wrapper = shallowMount(VaPageHeader, {
      slots: {
        subtitle: '<strong>Test</strong>'
      }
    })

    expect(wrapper.find('h2').exists()).toBeTruthy()
  })
})
