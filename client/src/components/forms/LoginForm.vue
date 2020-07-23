<template>
  <form
    @submit.prevent="loginUser"
    class="flex flex-col bg-aquamarine-500 lg:w-1/3 container mx-auto py-2 px-6"
  >
    <label>Username</label>
    <input v-model="username" type="text" />
    <label>Password</label>
    <input v-model="password" type="password" />
    <input type="submit" class="bg-black-500 text-white-500 py-2 my-6" value="Login" />
    <router-link to="/register">Need an account ?</router-link>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'LoginForm',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    ...mapActions(['login']),
    loginUser() {
      console.log(this.username);
      let user = {
        username: this.username,
        password: this.password,
      };
      this.login(user)
        .then((res) => {
          if (res.data.success) {
            this.$router.push('/profile');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
