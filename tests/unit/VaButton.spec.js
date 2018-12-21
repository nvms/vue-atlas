import { mount } from '@vue/test-utils'
import VaButton from '@/Button/VaButton.vue'

describe('VaButton.vue', () => {

  it('renders correctly', () => {
    const wrapper = mount(VaButton)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders without warnings', () => {
    let spy = jest.spyOn(console, "error")
    mount(VaButton)
    expect(spy).toBeCalledTimes(0)
    spy.mockReset()
  })

  it('renders an anchor', () => {
    const wrapper = mount(VaButton)
    expect(wrapper.contains('a')).toBe(true)
  })

  it('accepts "primary" as prop "type"', () => {
    const wrapper = mount(VaButton, {
      propsData: {
        type: 'primary'
      }
    })
    expect(wrapper.props().type).toBe('primary')
  })

  it('prop "type" with value primary results in element with va-btn-primary class', () => {
    const wrapper = mount(VaButton, {
      propsData: {
        type: 'primary'
      }
    })
    expect(wrapper.classes()).toContain('va-btn-primary')
  })

  it('"default" should be the default value for prop "type"', () => {
    const wrapper = mount(VaButton)
    expect(wrapper.props().type).toBe('default')
  })

  it('values passed to slots should render correctly', () => {
    const wrapper = mount(VaButton, {
      slots: {
        default: '<span>Hello</span>'
      }
    })
    expect(wrapper.find('span').text()).toBe('Hello')
  })

})
