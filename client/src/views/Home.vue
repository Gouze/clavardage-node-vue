<template>
  <div class="home container mx-auto">
    <PostForm v-if="isLoggedIn" class="w-2/3 mx-auto mt-6"></PostForm>
    <div
      v-if="isLoggedIn && newPost"
      @click="toggleNewPost"
      class="mx-auto w-2/3 bg-tickle-me-pink-300 black-shadow border-dashed p-4"
    >
      New post(s)
    </div>
    <div v-if="isLoggedIn" class="timeline w-2/3 mx-auto flex flex-col-reverse">
      <div
        v-for="(post, index) in posts"
        :key="`fruit-${index}`"
        class="w-full black-shadow my-6 py-6 px-4"
      >
        <div class="flex w-full">
          <div>
            <div v-if="post.author.avatarURL">avatarURL</div>
            <AdorableAvatar
              v-if="!post.author.avatarURL"
              :email="post.author.email"
              :size="32"
              class="black-shadow"
            ></AdorableAvatar>
          </div>
          <div class="flex flex-col ml-4">
            <span class="font-semibold">{{ post.author.name || post.author.username }}</span>

            <span class="text-sm">@{{ post.author.username }}</span>
          </div>
          <div class="self-center ml-auto" v-if="checkUser(post.author)">Edit Delete</div>
        </div>
        <p class="pt-4" v-linkified>{{ post.content }}</p>
      </div>
    </div>
    <div v-if="!isLoggedIn">Clavardage</div>
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
import { mapGetters, mapActions } from 'vuex';
import AdorableAvatar from 'vue-adorable-avatar';
import PostForm from '../components/forms/PostForm';
import axios from 'axios';
import firebase from 'firebase/app';

export default {
  name: 'Home',
  data() {
    return {
      lastPost: null,
      newPost: false,
    };
  },
  components: { KinesisContainer, KinesisElement, AdorableAvatar, PostForm },
  computed: {
    ...mapGetters(['isLoggedIn', 'user', 'posts']),
  },
  methods: {
    ...mapActions(['createPost', 'fetchPosts']),
    checkUser(user) {
      if (user.username === this.user.username) {
        return true;
      }
      return false;
    },
    toggleNewPost() {
      this.fetchPosts().then(() => {
        this.newPost = !this.newPost;
      });
    },
  },
  created() {
    const lastPostRef = firebase.database().ref('/posts/lastPost/');
    lastPostRef.on('value', (snapshot) => {
      console.log(snapshot.val());
      this.lastPost = snapshot.val();
      console.log(this.posts);
      const lastPostIndex = this.posts.length - 1;
      if (this.lastPost._id !== this.posts[lastPostIndex]._id) {
        this.newPost = true;
      } else {
        this.newPost = false;
      }
    });

    if (this.isLoggedIn) {
      this.fetchPosts();
      // axios.get("https://clavardage-api.herokuapp.com/api/posts").then((res) => {
      //   this.posts = res.data.posts;
      // });
    }
  },
};
</script>
