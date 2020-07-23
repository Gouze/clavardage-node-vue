<template>
  <div id="loginView">
    <LoginForm></LoginForm>
  </div>
</template>

<script>
import LoginForm from '../components/forms/LoginForm';

export default {
  name: 'Login',
  components: { LoginForm },
};
</script>
