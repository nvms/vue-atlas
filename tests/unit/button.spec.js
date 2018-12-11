import { mount } from '@vue/test-utils'
import VaButton from '@/Button/VaButton.vue'

describe('VaButton.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(VaButton)
    expect(wrapper.element).toMatchSnapshot()
  })

})

describe('VaButton.vue', () => {
  it('renders an anchor', () => {
    const wrapper = mount(VaButton)
    expect(wrapper.contains('a')).toBe(true)
  })
})

describe('VaButton.vue', () => {
  it('prop is type primary', () => {
    const wrapper = mount(VaButton, {
      propsData: {
        type: 'primary'
      }
    })
    expect(wrapper.props().type).toBe('primary')
  })
})

describe('VaButton.vue', () => {
  it('prop type of primary results in va-btn-primary class', () => {
    const wrapper = mount(VaButton, {
      propsData: {
        type: 'primary'
      }
    })
    expect(wrapper.classes()).toContain('va-btn-primary')
  })
})

describe('VaButton.vue', () => {
  it('values passed to slots should render correctly', () => {
    const wrapper = mount(VaButton, {
      slots: {
        default: '<span>Hello</span>'
      }
    })
    expect(wrapper.find('span').text()).toBe('Hello')
  })
})
