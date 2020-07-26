import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/styles/index.css';
import './assets/styles/main.scss';
import axios from 'axios';
import VueLodash from 'vue-lodash';
import lodash from 'lodash';
import linkify from 'vue-linkify';

import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCDte7FMQBoi2sAAHUr-ODy4Qf4-XZwJGA',
  authDomain: 'clavardage-9fb58.firebaseapp.com',
  databaseURL: 'https://clavardage-9fb58.firebaseio.com',
  projectId: 'clavardage-9fb58',
  storageBucket: 'clavardage-9fb58.appspot.com',
  messagingSenderId: '118939470773',
  appId: '1:118939470773:web:39f47f7116589ce46267fc',
};

firebase.initializeApp(firebaseConfig);

Vue.directive('linkified', linkify);
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
