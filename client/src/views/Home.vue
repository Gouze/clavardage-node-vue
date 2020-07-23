<template>
  <div class="home"></div>
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

export default {
  name: 'Home',
  components: { KinesisContainer, KinesisElement },
};
</script>
