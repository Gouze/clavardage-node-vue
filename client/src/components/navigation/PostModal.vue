<template>
  <div>
    <div
      v-if="isModalOpen"
      class="modal w-1/4 mx-auto fixed bg-aquamarine-500 top-0 left-0 right-0"
    >
      yolo
    </div>
    <button @click.prevent="toggleModal" class="fixed bottom-0 right-0 post-modal__button">
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
</style>

<script>
export default {
  name: 'PostModal',

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
};
</script>
