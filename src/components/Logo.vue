<template>
    <div class="logo-container">
        <img src="@/assets/images/logo.png" alt="">
    </div>
</template>

<script>
export default {
  name: 'Logo',
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/animations";

.logo-container {
  width: 209px;
  max-width: 100%;
  margin: 0 auto 34px;
  opacity: 0;
  animation: fadeUp 1000ms ease-out forwards;
  img {
    display: block;
    width: 100%;
  }
}
</style>
