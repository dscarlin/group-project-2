
import { shallowMount, mount, createLocalVue } from "@vue/test-utils"
import App from "@/App.vue"
import VueRouter from "vue-router"
import routes from '@/routes.js'
import About from "@/views/About.vue"
import {expect} from 'chai'

const localVue = createLocalVue()
localVue.use(VueRouter)

// tests a route that does not depend on a parameter 
  describe("App", () => {
    it(`renders a child component via routing on path: /about`, () => {
      const router = new VueRouter({ routes: routes })
      const wrapper = mount(App, { localVue, router })
      router.push('/about')
      setTimeout(()=>expect(wrapper.find(About).exists()).to.equal(true),200);
    })
  })

