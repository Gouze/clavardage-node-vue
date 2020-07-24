<template>
  <div>
    <div
      @click.self="toggleModal"
      v-if="isModalOpen"
      class="modal w-1/4 mx-auto fixed  top-0 left-0 h-screen w-screen  z-20 flex justify-center items-center"
    >
      <PostForm @click.prevent></PostForm>
    </div>
    <button
      @click.prevent="toggleModal"
      v-if="isLoggedIn"
      class="fixed bottom-0 right-0 post-modal__button"
    >
      Post
    </button>
  </div>
</template>

<style lang="scss" scoped>
.post-modal__button {
  background: #fff;
  color: #000;
  text-transform: uppercase;
  border: 2px solid #000;
  font-weight: 800;
  padding: 0.2rem 0.4rem;
  margin: 1.5rem;
  box-shadow: 6px 6px 0px #80ffdb;
  transition: all 0.3s cubic-bezier(0, 0, 0.3, 1);
  &:hover {
    box-shadow: 3px 3px 0px #80ffdb;
  }
}
.modal {
  background: rgba(0, 0, 0, 0.8);
}
</style>

<script>
import PostForm from '../forms/PostForm';
import { mapGetters } from 'vuex';
export default {
  name: 'PostModal',
  components: {
    PostForm,
  },
  data() {
    return {
      isModalOpen: false,
    };
  },
  methods: {
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
  },
  computed: {
    ...mapGetters(['isLoggedIn']),
  },
};
</script>
