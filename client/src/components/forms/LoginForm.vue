<template>
  <form @submit.prevent="loginUser" class="flex flex-col lg:w-1/3 container mx-auto py-2 px-6 py-8">
    <label class="font-black">Username</label>
    <input
      v-on:change="$emit('dino')"
      v-model="username"
      type="text"
      class="black-shadow mt-1 mb-3 h-10 font-black"
    />
    <label>Password</label>
    <input v-model="password" type="password" class="black-shadow mt-1 mb-6 h-10 font-black" />
    <input
      type="submit"
      class="bg-black-500 text-white-500 btn primary py-2 my-6 h-10"
      value="Login"
    />
    <router-link to="/register" class="text-center my-6 font-black tracking-wider">Need an account ?</router-link>
    <div :v-on:dino="setMessage()">{{message}}</div>
  </form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "LoginForm",
  data() {
    return {
      username: "",
      password: "",
      message: "",
    };
  },
  methods: {
    ...mapActions(["login"]),
    setMessage() {
      if (this.username.includes("dino")) {
        this.message = "dino";
      } else {
        this.message = "";
      }
    },

    loginUser() {
      this.$emit("dino");
      let user = {
        username: this.username,
        password: this.password,
      };
      this.login(user)
        .then((res) => {
          if (res.data.success) {
            this.$router.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
