import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'There is no topping teamPizza.slice()'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    console.log('message: '+msg)
    expect(wrapper.text()).to.include(msg)
  })
})
