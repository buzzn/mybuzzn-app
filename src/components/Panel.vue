<template>
    <div class="panel wrap">
      <h2>{{ title }}</h2>
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'Panel',
  props: ['title'],
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";
@import "../assets/scss/animations";

.panel {
  background: $grey-1;
  border-radius: 25px;
  opacity: 0;
  animation: fadeUp 1000ms ease-out 200ms forwards;
  max-width: 450px;
  box-sizing: border-box;
  padding: 15px 20px;
  margin-bottom: 40px;
  h2 {
    font-size: 18px;
    margin: 0 0 1em;
    text-align: center;
  }
  p {
    font-size: 18px;
    line-height: 1.4em;
    margin-bottom: 30px;
  }
}
</style>
