<template>
  <div id="registerView">
    <RegisterForm></RegisterForm>
  </div>
</template>

<script>
import RegisterForm from '@/components/forms/RegisterForm';
export default {
  name: 'Register',
  components: {
    RegisterForm,
  },
};
</script>
