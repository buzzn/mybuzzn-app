<template>
  <div class="theme--login">
    <header-bar>{{ 'login' | translate }}</header-bar>
    <logo></logo>
    <version-bar></version-bar>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar';
import Logo from '@/components/Logo';
import VersionBar from '@/components/VersionBar';

export default {
  name: 'Login',
  components: {
    HeaderBar,
    Logo,
    VersionBar,
  },
};
</script>

<style scoped>

</style>
