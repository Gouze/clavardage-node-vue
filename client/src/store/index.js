import Vue from 'vue';
import Vuex from 'vuex';

import auth from './warehouse/auth';
import posts from './warehouse/posts';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { auth, posts },
});
