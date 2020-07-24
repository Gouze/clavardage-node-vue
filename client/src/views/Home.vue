<template>
  <div class="home container mx-auto">
    <div v-if="isLoggedIn" class="timeline w-2/3 mx-auto">
      <lottie-animation path="path/to/your/lottie-animation.json" />
      <div
        v-for="(post, index) in posts"
        :key="`fruit-${index}`"
        class="w-full black-shadow my-6 py-6 px-4"
      >
        <div class="flex w-full">
          <div>
            <div v-if="post.author.avatarURL">
              avatarURL
            </div>
            <AdorableAvatar
              v-if="!post.author.avatarURL"
              :email="post.author.email"
              :size="32"
              class="black-shadow"
            ></AdorableAvatar>
          </div>
          <div class="flex flex-col ml-4">
            <span class=" font-semibold">{{ post.author.name || post.author.username }}</span>

            <span class="text-sm">@{{ post.author.username }}</span>
          </div>
          <div class=" self-center ml-auto" v-if="checkUser(post.author)">Edit Delete</div>
        </div>
        <p class="pt-4">{{ post.content }}</p>
      </div>
    </div>
    <div v-if="!isLoggedIn">
      Clavardage
    </div>
  </div>
</template>
<style lang="scss" scoped>
.home {
  .main {
    min-height: calc(100vh - 81px);
    .text-animated {
      color: red;
      top: 50%;
      margin: 0 auto;
      width: 100%;
      text-align: center;
    }
  }
}
</style>
<script>
// @ is an alias to /src
import { KinesisContainer, KinesisElement } from 'vue-kinesis';
import { mapGetters } from 'vuex';
import AdorableAvatar from 'vue-adorable-avatar';
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      posts: [],
    };
  },
  components: { KinesisContainer, KinesisElement, AdorableAvatar },
  computed: {
    ...mapGetters(['isLoggedIn', 'user']),
  },
  methods: {
    checkUser(user) {
      console.log('user', user.username);
      console.log('thisuser', this.user.username);
      if (user.username === this.user.username) {
        return true;
      }
      return false;
    },
  },
  created() {
    if (this.isLoggedIn) {
      console.log('logged');
      axios.get('http://localhost:3000/api/posts').then((res) => {
        this.posts = res.data.posts;
      });
    }
  },
};
</script>
