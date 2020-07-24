<template>
  <nav class="flex items-center  bg-aquamarine-500 p-6">
    <div class="block w-1/3">
      <button id="sidebarBtn" @click="toggleMenu" class="flex flex-col items-left px-3 py-2">
        <span class="block text-sm w-6 bg-black-500"></span>
        <span class="block text-sm w-4 bg-black-500 my-1"></span>
        <span class="block text-sm w-5 bg-black-500"></span>
      </button>
    </div>
    <div
      id="sidebar"
      @click="toggleMenu"
      class="w-auto px-10 flex fixed justify-between flex-col h-screen top-0 left-0 bg-purple-heart-500 text-aquamarine-500 tracking-widest"
      v-bind:class="{ open: isMenuOpen }"
    >
      <div class="logo">
        <router-link
          to="/profile"
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >Profile</router-link
        >
      </div>
      <div class="text-md font-black flex flex-col">
        <router-link
          to="/"
          href="#responsive-header"
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >Home</router-link
        >
        <a
          href="#responsive-header"
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >Examples</a
        >
        <a
          href="#responsive-header"
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
          >Blog</a
        >
      </div>
      <div>
        <a
          href="#"
          class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          >Download</a
        >
      </div>
    </div>
    <div class="flex items-center flex-shrink-0 text-black mr-6 w-1/3 justify-center">
      <span class="font-semibold text-xl tracking-tight">Clavardage</span>
    </div>
    <div class="flex justify-end w-1/3">
      <router-link class="btn primary" to="/login" v-if="!isLoggedIn">Login</router-link>
      <router-link class="btn primary" to="/register" v-if="!isLoggedIn">Register</router-link>
      <div v-if="isLoggedIn" @click.prevent="logoutUser" class="btn primary">Logout</div>
    </div>
  </nav>
</template>
<style lang="scss" scoped>
#sidebar {
  transform: translateX(-100%);
  &.open {
    transform: translateX(0);
  }
}

#sidebarBtn {
  span {
    height: 3px;
  }
}
</style>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Nav',
  data() {
    return {
      isMenuOpen: false,
    };
  },
  computed: { ...mapGetters(['isLoggedIn']) },
  methods: {
    ...mapActions(['logout']),
    logoutUser() {
      console.log('logout');
      this.logout();
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>
