import { shallowMount } from '@vue/test-utils'
import VaCollapse from '@/Collapse/VaCollapse.vue'
import VaCollapsePanel from '@/Collapse/VaCollapsePanel.vue'

describe('VaCollapse.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount({
      render () {
        return (
          <VaCollapse>
            <VaCollapsePanel header="header">body</VaCollapsePanel>
            <VaCollapsePanel header="header">body</VaCollapsePanel>
            <VaCollapsePanel header="header">body</VaCollapsePanel>
          </VaCollapse>
        )
      }
    })
    expect(wrapper).toMatchSnapshot()
  })
})
