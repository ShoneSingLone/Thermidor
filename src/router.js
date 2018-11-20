import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: () =>
        import( /* webpackChunkName: "home" */ './views/Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () =>
        import( /* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/drag',
      name: 'drag',
      component: () =>
        import( /* webpackChunkName: "drag" */ './views/Drag.vue')
    },
    {
      path: '/scrollBar',
      name: 'scrollBar',
      component: () =>
        import( /* webpackChunkName: "scrollBar" */ './views/ScrollBar.vue')
    },
    {
      path: '/form',
      name: 'form',
      component: () =>
        import( /* webpackChunkName: "form" */ '@c/Form/Form.vue'),
      children: [{
        path: 'select',
        name: 'form.select',
        component: () =>
          import( /* webpackChunkName: "form.select" */ '@c/Form/Select/Select.vue'),
      }]
    }
  ]
})