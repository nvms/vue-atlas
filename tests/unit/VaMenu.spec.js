import { shallowMount } from '@vue/test-utils'
import VaMenu from '@/Menu/VaMenu.vue'
import VaMenuGroup from '@/Menu/VaMenuGroup.vue'
import VaMenuItem from '@/Menu/VaMenuItem.vue'
import VaMenuDivider from '@/Menu/VaMenuDivider.vue'

describe('VaMenu.vue', () => {
  it('renders correctly with children', () => {
    const wrapper = shallowMount({
      render () {
        return (
          <VaMenu>
            <VaMenuGroup>
              <VaMenuItem>Item</VaMenuItem>
              <VaMenuItem>Item</VaMenuItem>
            </VaMenuGroup>
            <VaMenuDivider></VaMenuDivider>
            <VaMenuGroup>
              <VaMenuItem>Item</VaMenuItem>
            </VaMenuGroup>
          </VaMenu>
        )
      }
    })
    expect(wrapper).toMatchSnapshot()
  })
})