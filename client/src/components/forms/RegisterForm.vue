<template>
  <form
    @submit.prevent="registerUser"
    class="flex flex-col bg-aquamarine-500 lg:w-1/3 container mx-auto py-2 px-6"
  >
    <label>Username</label>
    <input v-model="username" type="text" />
    <label>Email</label>
    <input v-model="email" type="email" />

    <label>Password</label>
    <input v-model="password" type="password" />
    <label>Confirm Password</label>
    <input v-model="confirmPassword" type="password" />
    <label>Name</label>
    <input v-model="name" type="text" />
    <input type="submit" class="bg-black-500 text-white-500 py-2 my-6" value="Register" />
    <router-link to="/login">Already have an account</router-link>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'RegisterForm',
  data() {
    return {
      username: '',
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
    ...mapActions(['register']),
    registerUser() {
      let newUser = {
        username: this.username,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        name: this.name,
      };
      this.register(newUser).then((res) => {
        console.log(res);
        if (res.data.success) {
          this.$router.push('login');
        }
      }).catch;
    },
  },
};
</script>
