import axios from 'axios';
import router from '../../router';

const state = {
  posts: {},
  status: '',
  error: null,
};

const getters = {
  posts: (state) => state.posts,
  error: (state) => state.error,
};

const actions = {
  async createPost({ commit }, postData) {
    commit('post_request');
    let res = await axios.post('http://localhost:3000/api/posts/create', postData);
    if (res.data.success !== undefined) {
      res.data.post.author = this.state.auth.user;
      commit('post_created', res.data.post);
    }
    return res;
  },
  async fetchPosts({ commit }) {
    commit('post_request');
    let res = await axios.get('http://localhost:3000/api/posts');
    if (res.data.success !== undefined) {
      commit('post_success', res.data.posts);
    }
    return res;
  },
};

const mutations = {
  post_request(state) {
    state.error = null;
    state.status = 'loading';
  },
  post_success(state, posts) {
    state.posts = _.orderBy(posts, 'createdAt', 'asc');
    state.status = 'success';
  },
  post_created(state, post) {
    state.posts.push(post);

    state.status = 'success';
  },
};
export default {
  state,
  actions,
  mutations,
  getters,
};
