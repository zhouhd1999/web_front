import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import Api from './api/api.js'
import Global from './api/global'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import $ from 'jquery'

import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;
Vue.use(mavonEditor)
Vue.use(ElementUI);
Vue.prototype.$req = Api;
Vue.prototype.GLOBAL=Global;

Vue.directive("title", {
  inserted: function(el) {
    document.title = el.dataset.title;
  }
});


router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

