import { mount } from '@vue/test-utils'
import VaLozenge from '@/Lozenge/VaLozenge.vue'

describe('VaLozenge.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(VaLozenge)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders a span', () => {
    const wrapper = mount(VaLozenge)
    expect(wrapper.contains('span')).toBe(true)
  })

  it('accepts "primary" as prop "type"', () => {
    const wrapper = mount(VaLozenge, {
      propsData: {
        type: 'primary'
      }
    })
    expect(wrapper.props().type).toBe('primary')
  })

  it('prop type of primary results in va-lozenge-primary class', () => {
    const wrapper = mount(VaLozenge, {
      propsData: {
        type: 'primary'
      }
    })
    expect(wrapper.classes()).toContain('va-lozenge-primary')
  })

  it('values passed to slots should render correctly', () => {
    const wrapper = mount(VaLozenge, {
      slots: {
        default: '<span>Hello</span>'
      }
    })
    expect(wrapper.find('span').text()).toBe('Hello')
  })
})
