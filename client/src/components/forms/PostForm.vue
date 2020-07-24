<template>
  <form @submit.prevent="sendPost" class="p-6 relative flex flex-col">
    <textarea
      @click.prevent
      v-model="content"
      cols="30"
      rows="3"
      class="black-shadow p-1"
      placeholder="Write your post"
    ></textarea>
    <input
      class="absolute bottom-0 right-0 btn secondary mr-2"
      type="submit"
      style="margin-right: 1.2rem"
    />
  </form>
</template>
<style lang="scss" scoped>
textarea {
  outline: 0;
}
</style>
<script>
export default {
  name: 'PostForm',
};
</script>
