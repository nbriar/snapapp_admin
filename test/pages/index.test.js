import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'

import IndexPage from '../../pages/index.vue'

describe('Index Page', () => {
  let wrapper

  const routes = [
    { path: '/'}
  ]

  const router = new VueRouter({ routes })

  beforeEach(() => {

    const localVue = createLocalVue()
    localVue.use(VueRouter)
    localVue.use(Vuetify)

    wrapper = shallowMount(IndexPage, {
      localVue: localVue,
      router,
    })
  })

  it('Test ', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
    console.log('test', wrapper)
    expect(wrapper.isAuthenticated).toEqual(undefined)
  })
})
