<template>
  <div>
    <header-bar>{{ 'login' | translate }}</header-bar>
    login
  </div>
</template>

<script>
import HeaderBar from '../components/HeaderBar';

export default {
  name: 'Login',
  components: {
    HeaderBar,
  },
};
</script>

<style scoped>

</style>
