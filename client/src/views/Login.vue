<template>
  <div id="loginView" class="flex justify-center items-center app-screen">
    <LoginForm class="black-shadow"></LoginForm>
  </div>
</template>

<script>
import LoginForm from '../components/forms/LoginForm';

export default {
  name: 'Login',
  components: { LoginForm },
};
</script>
