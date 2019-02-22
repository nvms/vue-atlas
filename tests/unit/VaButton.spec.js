import { mount } from '@vue/test-utils'
import VaButton from '@/Button/VaButton.vue'
import VaIcon from '@/Icon/VaIcon.vue'
import Vue from 'vue'

describe('VaButton.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(VaButton)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders without warnings', () => {
    let spy = jest.spyOn(console, 'error')
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

  it('should support disabled', () => {
    const wrapper = mount(VaButton, {
      propsData: {
        disabled: true
      }
    })
    expect(wrapper.classes()).toContain('va-btn-disabled')
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

  it('icon passed to slot should render correctly', () => {
    const wrapper = mount({
      render () {
        return (
          <VaButton>
            <VaIcon type='home' />
          </VaButton>
        )
      }
    })
    expect(wrapper).toMatchSnapshot()
  })

  it('value passed to iconBefore should render correctly', () => {
    const wrapper = mount({
      render () {
        return (
          <VaButton iconBefore="home">Hello</VaButton>
        )
      }
    })
    expect(wrapper).toMatchSnapshot()
  })

  it('value passed to iconAfter should render correctly', () => {
    const wrapper = mount({
      render () {
        return (
          <VaButton iconAfter="home">Hello</VaButton>
        )
      }
    })
    expect(wrapper).toMatchSnapshot()
  })

  it('should change loading state on click', done => {
    // prevent timeout
    Vue.config.errorHandler = done
    const AButton = {
      data () {
        return {
          loading: false
        }
      },
      methods: {
        enableLoading () {
          this.loading = true
        }
      },
      render () {
        return <VaButton loading={this.loading} onClick={this.enableLoading}>Hello</VaButton>
      }
    }
    const wrapper = mount(AButton)
    wrapper.trigger('click')
    Vue.nextTick(() => {
      expect(wrapper.findAll('va-loading').length).toBe(1)
      done()
    })
    expect(wrapper).toMatchSnapshot()
  })
})
