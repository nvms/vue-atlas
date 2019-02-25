import { mount } from '@vue/test-utils'
import VaForm from '@/Form/VaForm.vue'
import VaFormItem from '@/Form/VaFormitem.vue'

describe('VaForm.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(VaForm)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('supports vertical', () => {
    const wrapper = mount(VaForm, {
      propsData: {
        type: 'vertical'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('supports inline', () => {
    const wrapper = mount(VaForm, {
      propsData: {
        type: 'inline'
      }
    })
    expect(wrapper.classes()).toContain('va-form-inline')
  })

  it('should render label correctly', () => {
    const wrapper = mount({
      render () {
        return (
          <VaForm>
            <VaFormItem label='label'>Hello</VaFormItem>
          </VaForm>
        )
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render column sizes correctly', () => {
    // default
    const wrapper = mount({
      render () {
        return (
          <VaForm type='horizontal'>
            <VaFormItem label='label'>Hello</VaFormItem>
          </VaForm>
        )
      }
    })
    expect(wrapper.findAll('.va-col-sm-2.va-control-label').length).toBe(1)
    expect(wrapper.findAll('.va-col-sm-10.va-flex').length).toBe(1)

    // custom label-col
    const wrapper2 = mount({
      render () {
        return (
          <VaForm type='horizontal'>
            <VaFormItem label='label' label-col='5'>Hello</VaFormItem>
          </VaForm>
        )
      }
    })
    expect(wrapper2.findAll('.va-col-sm-5.va-control-label').length).toBe(1)
    expect(wrapper2.findAll('.va-col-sm-7.va-flex').length).toBe(1)
  })
})
