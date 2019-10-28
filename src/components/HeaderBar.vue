<template>
    <header>
        <h1>
          <slot></slot>
        </h1>
    </header>
</template>

<script>
export default {
  name: 'HeaderBar',
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";
@import "../assets/scss/animations";

header {
  background: rgba($white, 0.85);
  height: 50px;
  border: 1px solid $grey-2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
  animation: fadeDown 800ms ease forwards;

  h1 {
    margin: 0;
    text-align: center;
    flex: 1;
    font-size: 16px;
  }
}
</style>
