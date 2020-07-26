import axios from 'axios';
import router from '../../router';

const state = {
  token: localStorage.getItem('token') || '',
  user: {},
  status: '',
  error: null,
};

const getters = {
  // isLoggedIn: function (state) {
  //     if (state.token != '') {
  //         return true
  //     } else {
  //         return false
  //     }
  // }
  isLoggedIn: (state) => !!state.token,
  authState: (state) => state.status,
  user: (state) => state.user,
  error: (state) => state.error,
};

const actions = {
  // Login Action
  async login({ commit, state }, user) {
    commit('auth_request');
    try {
      let res = await axios.post('https://clavardage-api.herokuapp.com/api/users/login', user);
      if (res.data.success) {
        const token = res.data.token;
        const user = res.data.user;
        // Store the token into the localstorage
        localStorage.setItem('token', token);
        // Set the axios defaults
        axios.defaults.headers.common['Authorization'] = token;
        commit('auth_success', { token, user });
      }
      return res;
    } catch (err) {
      commit('auth_error', err);
    }
  },

  //register user
  async register({ commit }, userData) {
    commit('register_request');
    let res = await axios.post('https://clavardage-api.herokuapp.com/api/users/register', userData);
    if (res.data.succes !== undefined) {
      commit('register_success');
    }
    return res;
  },

  async getProfile({ commit }) {
    commit('profile_request');
    let res = await axios.get('https://clavardage-api.herokuapp.com/api/users/profile');
    commit('user_profile', res.data.user);
    return res;
  },

  async logout({ commit }) {
    await localStorage.removeItem('token');
    commit('logout');
    delete axios.defaults.headers.common['Authorization'];
    router.push('/login');
    return;
  },
};

const mutations = {
  auth_request(state) {
    state.error = null;
    state.status = 'loading';
  },
  auth_success(state, { token, user }) {
    state.token = token;
    state.user = user;
    state.status = 'success';
  },

  register_request(state) {
    state.status = 'loading';
  },
  register_success(state) {
    state.status = 'success';
  },
  logout(state) {
    state.status = '';
    state.token = '';
    state.user = '';
  },
  profile_request(state) {
    state.status = 'loading';
  },
  user_profile(state, user) {
    state.user = user;
    state.status = 'success';
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
