import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/styles/index.css';
import './assets/styles/main.scss';
import axios from 'axios';
import VueLodash from 'vue-lodash';
import lodash from 'lodash';
import LottieAnimation from 'lottie-vuejs'; // import lottie-vuejs

Vue.use(LottieAnimation); // add lottie-animation to your global scope
Vue.config.productionTip = false;
Vue.use(VueLodash, { name: 'custom', lodash: lodash });
// Setting axios as vue's http module
Vue.prototype.$http = axios;
//load the token form the localStorage

const token = localStorage.getItem('token');
//if there is any token then append default axios authiraztion headers
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
