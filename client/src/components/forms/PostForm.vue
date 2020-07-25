<template>
  <form @submit.prevent="sendPost" class=" relative flex flex-col">
    <textarea
      @click.prevent
      v-model="content"
      cols="30"
      rows="3"
      class="black-shadow p-1"
      placeholder="Write your post"
    ></textarea>
    <input
      class="absolute bottom-0 right-0 btn secondary mr-2 mt-10"
      type="submit"
      style="margin-right: 1.2rem; "
    />
  </form>
</template>
<style lang="scss" scoped>
textarea {
  outline: 0;
}
</style>
<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';

export default {
  name: 'PostForm',
  data() {
    return {
      content: '',
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    ...mapActions(['createPost']),
    sendPost() {
      console.log(this.user._id);
      let post = {
        content: this.content,
        type: 'text',
        author: this.user._id,
        createdAt: new Date(),
      };
      this.createPost(post).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>
