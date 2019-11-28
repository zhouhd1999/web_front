import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import Api from './api/api.js'

import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$req = Api;

Vue.directive("title", {
  inserted: function(el) {
    document.title = el.dataset.title;
  }
});


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
