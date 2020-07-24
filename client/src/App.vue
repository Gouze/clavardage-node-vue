<template>
  <div id="app">
    <Nav></Nav>
    <PostModal></PostModal>
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
@font-face {
  font-family: 'Object Sans';
  src: url('assets/fonts/ObjectSans-Thin.woff2') format('woff2'),
    url('assets/fonts/ObjectSans-Thin.woff') format('woff');
  font-weight: 100;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Object Sans';
  src: url('assets/fonts/ObjectSans-MediumSlanted.woff2') format('woff2'),
    url('assets/fonts/ObjectSans-MediumSlanted.woff') format('woff');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Object Sans Slanted';
  src: url('assets/fonts/ObjectSans-Slanted.woff2') format('woff2'),
    url('assets/fonts/ObjectSans-Slanted.woff') format('woff');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Object Sans';
  src: url('assets/fonts/ObjectSans-HeavySlanted.woff2') format('woff2'),
    url('assets/fonts/ObjectSans-HeavySlanted.woff') format('woff');
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Object Sans';
  src: url('assets/fonts/ObjectSans-ThinSlanted.woff2') format('woff2'),
    url('assets/fonts/ObjectSans-ThinSlanted.woff') format('woff');
  font-weight: 100;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Object Sans';
  src: url('assets/fonts/ObjectSans-Bold.woff2') format('woff2'),
    url('assets/fonts/ObjectSans-Bold.woff') format('woff');
  font-weight: bold;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Object Sans';
  src: url('assets/fonts/ObjectSans-Black.woff2') format('woff2'),
    url('assets/fonts/ObjectSans-Black.woff') format('woff');
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Object Sans';
  src: url('assets/fonts/ObjectSans-Medium.woff2') format('woff2'),
    url('assets/fonts/ObjectSans-Medium.woff') format('woff');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Object Sans';
  src: url('assets/fonts/ObjectSans-BlackSlanted.woff2') format('woff2'),
    url('assets/fonts/ObjectSans-BlackSlanted.woff') format('woff');
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Object Sans';
  src: url('assets/fonts/ObjectSans-LightSlanted.woff2') format('woff2'),
    url('assets/fonts/ObjectSans-LightSlanted.woff') format('woff');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Object Sans';
  src: url('assets/fonts/ObjectSans-Light.woff2') format('woff2'),
    url('assets/fonts/ObjectSans-Light.woff') format('woff');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Object Sans Slanted';
  src: url('assets/fonts/ObjectSans-BoldSlanted.woff2') format('woff2'),
    url('assets/fonts/ObjectSans-BoldSlanted.woff') format('woff');
  font-weight: bold;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Object Sans';
  src: url('assets/fonts/ObjectSans-Regular.woff2') format('woff2'),
    url('assets/fonts/ObjectSans-Regular.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Object Sans';
  src: url('assets/fonts/ObjectSans-Heavy.woff2') format('woff2'),
    url('assets/fonts/ObjectSans-Heavy.woff') format('woff');
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}

#app {
  font-family: 'Object Sans', sans-serif;
}

.btn primary {
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
import Nav from '@/components/navigation/Nav';
import PostModal from '@/components/navigation/PostModal';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    Nav,
    PostModal,
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'user']),
  },
  methods: {
    ...mapActions(['getProfile']),
  },
  created() {
    if (this.isLoggedIn && _.isEmpty(this.user)) {
      this.getProfile();
    }
  },
};
</script>
