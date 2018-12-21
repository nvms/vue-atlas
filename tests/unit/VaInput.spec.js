import {mount, shallowMount} from '@vue/test-utils'
import VaInput from '@/Input/VaInput.vue'

describe('VaInput.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(VaInput)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders without warnings', () => {
    let spy = jest.spyOn(console, "error")
    mount(VaInput)
    expect(spy).toBeCalledTimes(0)
    spy.mockReset()
  })

  it('ensures focused is true when autofocus is passed', () => {
    const wrapper = mount(VaInput, {
      propsData: {
        autofocus: true
      }
    })
    expect(wrapper.vm.focused).toBeTruthy()
  })

  it('ensures focused is false when autofocus is not passed', () => {
    const wrapper = mount(VaInput)
    expect(wrapper.vm.focused).toBeFalsy()
  })

  it('has class .va-input-sm when "sm" passed for "size"', () => {
    const wrapper = mount(VaInput, {
      propsData: {
        size: 'sm'
      }
    })
    expect(wrapper.classes()).toContain('va-input-sm')
  })

  // console.log(window.document.getElementsByClassName('.va-input-ops'))

  it('should call update method when input event is triggered', () => {
    const wrapper = mount(VaInput)
    const updateMock = jest.fn()
    wrapper.vm.update = updateMock
    wrapper.update()

    const input = wrapper.find('.va-form-control').trigger('input')
    expect(updateMock.mock.calls.length).toBe(1)
  })

  it('should call enterPressed method when keyup.enter event is triggered', () => {
    const wrapper = mount(VaInput)
    const enterMock = jest.fn()
    wrapper.vm.enterPressed = enterMock
    wrapper.update()

    const input = wrapper.find('.va-form-control').trigger('keyup.enter')
    expect(enterMock.mock.calls.length).toBe(1)
  })

  it('should include a va-icon when showClean prop is true', () => {
    const wrapper = mount(VaInput, {
      propsData: {
        showClean: true
      }
    })
    expect(wrapper.find('va-icon').exists()).toBeTruthy()
  })

})